import json
import random
import string
import datetime
from flask import Blueprint, jsonify, request
from utils import get_db_connection, token_required

# Define the blueprint for group management
group_management = Blueprint('group_management', __name__)


def generate_group_key(length=6):
    """Generate a random alphanumeric group key"""
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(length))


@group_management.route('/create-group', methods=['POST'])
@token_required
def create_group():
    try:
        # Extract data from request
        user_id = 1
        group_name = request.json.get('group_name')
        description = request.json.get('description', '')
        goal_amount = request.json.get('goal_amount')

        # Input validation
        if not group_name or not goal_amount:
            return jsonify({"success": False, "message": "Group name and goal amount are required"}), 400

        try:
            goal_amount = int(goal_amount)
            if goal_amount <= 0:
                return jsonify({"success": False, "message": "Goal amount must be positive"}), 400
        except ValueError:
            return jsonify({"success": False, "message": "Goal amount must be a number"}), 400

        # Generate a unique group key
        conn = get_db_connection()
        cursor = conn.cursor()

        unique_key = False
        group_key = ""

        # Keep generating keys until we find a unique one
        while not unique_key:
            group_key = generate_group_key()
            cursor.execute('SELECT COUNT(*) FROM Groups WHERE group_key = ?', (group_key,))
            if cursor.fetchone()[0] == 0:
                unique_key = True

        # Get username for initial member data
        cursor.execute('SELECT username FROM Users WHERE user_id = ?', (user_id,))
        username_result = cursor.fetchone()

        if not username_result:
            conn.close()
            return jsonify({"success": False, "message": "User not found"}), 404

        username = username_result[0]

        # Create initial members list with creator (contribution starts at 0)
        members = json.dumps([{"user_id": user_id, "username": username, "contribution": 0}])

        # Insert new group
        cursor.execute('''
            INSERT INTO Groups (
                group_key, group_name, creator_id, description, 
                members, total_contribution, goal_amount, created_at
            ) VALUES (?, ?, ?, ?, ?, 0, ?, ?)
        ''', (
            group_key, group_name, user_id, description,
            members, goal_amount, datetime.datetime.utcnow()
        ))

        conn.commit()

        # Get the new group_id
        cursor.execute('SELECT group_id FROM Groups WHERE group_key = ?', (group_key,))
        group_id = cursor.fetchone()[0]

        conn.close()

        return jsonify({
            "success": True,
            "message": "Group created successfully",
            "group_id": group_id,
            "group_key": group_key
        }), 201

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@group_management.route('/join-group', methods=['POST'])
@token_required
def join_group():
    try:
        user_id = request.token_data['user_id']
        group_key = request.json.get('group_key')

        if not group_key:
            return jsonify({"success": False, "message": "Group key is required"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Find the group
        cursor.execute('SELECT group_id, members FROM Groups WHERE group_key = ?', (group_key,))
        result = cursor.fetchone()

        if not result:
            conn.close()
            return jsonify({"success": False, "message": "Group not found"}), 404

        group_id, members_json = result
        members = json.loads(members_json)

        # Check if user is already a member
        if any(member['user_id'] == user_id for member in members):
            conn.close()
            return jsonify({"success": False, "message": "You are already a member of this group"}), 409

        # Get username
        cursor.execute('SELECT username FROM Users WHERE user_id = ?', (user_id,))
        username_result = cursor.fetchone()

        if not username_result:
            conn.close()
            return jsonify({"success": False, "message": "User not found"}), 404

        username = username_result[0]

        # Add user to members list
        members.append({"user_id": user_id, "username": username, "contribution": 0})

        # Update group
        cursor.execute('''
            UPDATE Groups 
            SET members = ? 
            WHERE group_id = ?
        ''', (json.dumps(members), group_id))

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "message": "Joined group successfully",
            "group_id": group_id
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@group_management.route('/contribute', methods=['POST'])
@token_required
def contribute():
    try:
        user_id = request.token_data['user_id']
        group_id = request.json.get('group_id')
        amount = request.json.get('amount')

        # Input validation
        if not group_id or not amount:
            return jsonify({"success": False, "message": "Group ID and amount are required"}), 400

        try:
            amount = int(amount)
            if amount <= 0:
                return jsonify({"success": False, "message": "Contribution amount must be positive"}), 400
        except ValueError:
            return jsonify({"success": False, "message": "Amount must be a number"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Get group details
        cursor.execute('''
            SELECT members, total_contribution, goal_amount, goal_complete 
            FROM Groups 
            WHERE group_id = ?
        ''', (group_id,))

        result = cursor.fetchone()

        if not result:
            conn.close()
            return jsonify({"success": False, "message": "Group not found"}), 404

        members_json, total_contribution, goal_amount, goal_complete = result

        # Check if goal is already complete
        if goal_complete:
            conn.close()
            return jsonify({"success": False, "message": "This group has already reached its goal"}), 400

        members = json.loads(members_json)

        # Check if user is a member
        user_is_member = False
        for i, member in enumerate(members):
            if member['user_id'] == user_id:
                user_is_member = True
                # Update user's contribution
                members[i]['contribution'] += amount
                break

        if not user_is_member:
            conn.close()
            return jsonify({"success": False, "message": "You are not a member of this group"}), 403

        # Update total contribution
        new_total = total_contribution + amount

        # Check if goal is reached
        goal_reached = new_total >= goal_amount

        # Update group
        cursor.execute('''
            UPDATE Groups 
            SET members = ?, total_contribution = ?, goal_complete = ? 
            WHERE group_id = ?
        ''', (json.dumps(members), new_total, 1 if goal_reached else 0, group_id))

        # If goal reached, let's award some points to all members
        if goal_reached:
            # Award points to members
            for member in members:
                member_user_id = member['user_id']
                # Award points based on contribution
                contribution_percentage = member['contribution'] / new_total
                points_to_award = int(100 * contribution_percentage)  # Scale as needed

                cursor.execute('''
                    UPDATE Users 
                    SET total_points = total_points + ?, savings_score = savings_score + ? 
                    WHERE user_id = ?
                ''', (points_to_award, int(points_to_award / 2), member_user_id))

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "message": "Contribution added successfully",
            "new_total": new_total,
            "goal_reached": goal_reached
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@group_management.route('/get-group/<int:group_id>', methods=['GET'])
@token_required
def get_group(group_id):
    try:
        user_id = request.token_data['user_id']

        conn = get_db_connection()
        cursor = conn.cursor()

        # Get group details
        cursor.execute('''
            SELECT group_id, group_key, group_name, creator_id, description,
                   members, total_contribution, created_at, goal_amount, goal_complete
            FROM Groups 
            WHERE group_id = ?
        ''', (group_id,))

        result = cursor.fetchone()

        if not result:
            conn.close()
            return jsonify({"success": False, "message": "Group not found"}), 404

        group_data = {
            "group_id": result[0],
            "group_key": result[1],
            "group_name": result[2],
            "creator_id": result[3],
            "description": result[4],
            "members": json.loads(result[5]),
            "total_contribution": result[6],
            "created_at": result[7],
            "goal_amount": result[8],
            "goal_complete": bool(result[9]),
            "is_creator": (user_id == result[3])
        }

        # Check if user is a member
        members = json.loads(result[5])
        user_is_member = any(member['user_id'] == user_id for member in members)

        if not user_is_member:
            # If not a member, only return limited info
            limited_data = {
                "group_id": group_data["group_id"],
                "group_name": group_data["group_name"],
                "description": group_data["description"],
                "total_contribution": group_data["total_contribution"],
                "goal_amount": group_data["goal_amount"],
                "goal_complete": group_data["goal_complete"],
                "member_count": len(members)
            }
            conn.close()
            return jsonify({"success": True, "group": limited_data, "is_member": False}), 200

        conn.close()
        return jsonify({"success": True, "group": group_data, "is_member": True}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@group_management.route('/my-groups', methods=['GET'])
@token_required
def get_my_groups():
    try:
        user_id = request.token_data['user_id']

        conn = get_db_connection()
        cursor = conn.cursor()

        # Get all groups where user is a member
        cursor.execute('SELECT group_id, group_name, total_contribution, goal_amount, goal_complete FROM Groups')
        all_groups = cursor.fetchall()

        my_groups = []
        for group in all_groups:
            group_id, group_name, total_contribution, goal_amount, goal_complete = group

            # Get members for this group
            cursor.execute('SELECT members FROM Groups WHERE group_id = ?', (group_id,))
            members_json = cursor.fetchone()[0]
            members = json.loads(members_json)

            # Check if user is a member
            if any(member['user_id'] == user_id for member in members):
                my_groups.append({
                    "group_id": group_id,
                    "group_name": group_name,
                    "total_contribution": total_contribution,
                    "goal_amount": goal_amount,
                    "goal_complete": bool(goal_complete),
                    "progress_percentage": min(100,
                                               int((total_contribution / goal_amount) * 100)) if goal_amount > 0 else 0
                })

        conn.close()
        return jsonify({"success": True, "groups": my_groups}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@group_management.route('/leave-group', methods=['POST'])
@token_required
def leave_group():
    try:
        user_id = request.token_data['user_id']
        group_id = request.json.get('group_id')

        if not group_id:
            return jsonify({"success": False, "message": "Group ID is required"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Get group details
        cursor.execute('SELECT creator_id, members, goal_complete FROM Groups WHERE group_id = ?', (group_id,))
        result = cursor.fetchone()

        if not result:
            conn.close()
            return jsonify({"success": False, "message": "Group not found"}), 404

        creator_id, members_json, goal_complete = result
        members = json.loads(members_json)

        # If user is the creator, they can't leave unless the goal is complete
        if user_id == creator_id and not goal_complete:
            conn.close()
            return jsonify({
                "success": False,
                "message": "As the creator, you cannot leave the group until the goal is reached. You must delete the group instead."
            }), 403

        # Find user in members
        found = False
        user_contribution = 0
        for i, member in enumerate(members):
            if member['user_id'] == user_id:
                found = True
                user_contribution = member['contribution']
                del members[i]
                break

        if not found:
            conn.close()
            return jsonify({"success": False, "message": "You are not a member of this group"}), 404

        # If no members left or only creator is left and goal is complete, delete the group
        if len(members) == 0 or (len(members) == 1 and members[0]['user_id'] == creator_id and goal_complete):
            cursor.execute('DELETE FROM Groups WHERE group_id = ?', (group_id,))
            conn.commit()
            conn.close()
            return jsonify(
                {"success": True, "message": "You left the group and it was deleted as no active members remain"}), 200

        # If user is creator and leaving, assign new creator
        if user_id == creator_id:
            new_creator_id = members[0]['user_id']
            cursor.execute('UPDATE Groups SET creator_id = ?, members = ? WHERE group_id = ?',
                           (new_creator_id, json.dumps(members), group_id))
        else:
            # Update members list
            cursor.execute(
                'UPDATE Groups SET members = ?, total_contribution = total_contribution - ? WHERE group_id = ?',
                (json.dumps(members), user_contribution, group_id))

        conn.commit()
        conn.close()

        return jsonify({"success": True, "message": "You have left the group successfully"}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@group_management.route('/delete-group', methods=['DELETE'])
@token_required
def delete_group():
    try:
        user_id = request.token_data['user_id']
        group_id = request.json.get('group_id')

        if not group_id:
            return jsonify({"success": False, "message": "Group ID is required"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if user is the creator
        cursor.execute('SELECT creator_id FROM Groups WHERE group_id = ?', (group_id,))
        result = cursor.fetchone()

        if not result:
            conn.close()
            return jsonify({"success": False, "message": "Group not found"}), 404

        if result[0] != user_id:
            conn.close()
            return jsonify({"success": False, "message": "Only the group creator can delete the group"}), 403

        # Delete the group
        cursor.execute('DELETE FROM Groups WHERE group_id = ?', (group_id,))

        conn.commit()
        conn.close()

        return jsonify({"success": True, "message": "Group deleted successfully"}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@group_management.route('/search-groups', methods=['GET'])
@token_required
def search_groups():
    try:
        query = request.args.get('query', '')

        conn = get_db_connection()
        cursor = conn.cursor()

        # Search groups by name or description
        cursor.execute('''
            SELECT group_id, group_name, description, total_contribution, goal_amount, goal_complete
            FROM Groups
            WHERE group_name LIKE ? OR description LIKE ?
        ''', (f'%{query}%', f'%{query}%'))

        results = cursor.fetchall()

        groups = [{
            "group_id": row[0],
            "group_name": row[1],
            "description": row[2],
            "total_contribution": row[3],
            "goal_amount": row[4],
            "goal_complete": bool(row[5]),
            "progress_percentage": min(100, int((row[3] / row[4]) * 100)) if row[4] > 0 else 0
        } for row in results]

        conn.close()

        return jsonify({"success": True, "groups": groups}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500