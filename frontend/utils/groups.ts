export interface Group {
  group_id: number;
  group_name: string;
  description: string;
  total_contribution: number;
  goal_amount: number;
  goal_complete: boolean;
  progress_percentage?: number;
  group_key?: string;
  creator_id?: number;
  members?: Array<{
    user_id: number;
    username: string;
    contribution: number;
  }>;
  created_at?: string;
  is_creator?: boolean;
  member_count?: number;
}

export interface GroupResponse {
  success: boolean;
  message?: string;
  group_id?: number;
  group_key?: string;
  group?: Group;
  groups?: Group[];
  is_member?: boolean;
  new_total?: number;
  goal_reached?: boolean;
}

const API_BASE_URL = "http://127.0.0.1:5000/groups";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
};

export const createGroup = async (groupData: {
  group_name: string;
  description: string;
  goal_amount: number;
}): Promise<GroupResponse> => {
  const response = await fetch(`${API_BASE_URL}/create-group`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(groupData),
  });
  return response.json();
};

export const joinGroup = async (groupKey: string): Promise<GroupResponse> => {
  const response = await fetch(`${API_BASE_URL}/join-group`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ group_key: groupKey }),
  });
  return response.json();
};

export const contributeToGroup = async (
  groupId: number,
  amount: number
): Promise<GroupResponse> => {
  const response = await fetch(`${API_BASE_URL}/contribute`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ group_id: groupId, amount }),
  });
  return response.json();
};

export const getGroup = async (groupId: number): Promise<GroupResponse> => {
  const response = await fetch(`${API_BASE_URL}/get-group/${groupId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const getMyGroups = async (): Promise<GroupResponse> => {
  const response = await fetch(`${API_BASE_URL}/my-groups`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const leaveGroup = async (groupId: number): Promise<GroupResponse> => {
  const response = await fetch(`${API_BASE_URL}/leave-group`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ group_id: groupId }),
  });
  return response.json();
};

export const deleteGroup = async (groupId: number): Promise<GroupResponse> => {
  const response = await fetch(`${API_BASE_URL}/delete-group`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ group_id: groupId }),
  });
  return response.json();
};

export const searchGroups = async (query: string): Promise<GroupResponse> => {
  const response = await fetch(`${API_BASE_URL}/search-groups?query=${encodeURIComponent(query)}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return response.json();
}; 