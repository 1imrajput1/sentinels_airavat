"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TermsAndConditions() {
  const [accepted, setAccepted] = useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: "#07a6ec" }}>Terms and Conditions</h2>
        <p className="text-muted-foreground">Our legal agreement with you</p>
      </div>
      
      <Card style={{ borderColor: "#07a6ec" }}>
        <CardHeader style={{ backgroundColor: "rgba(7, 166, 236, 0.1)", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
          <CardTitle className="flex items-center" style={{ color: "#07a6ec" }}>
            <FileText className="h-5 w-5 mr-2" style={{ color: "#07a6ec" }} />
            Legal Agreement
          </CardTitle>
          <CardDescription>Last updated: June 15, 2023</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ScrollArea className="h-[400px] rounded-md border p-4" style={{ borderColor: "rgba(7, 166, 236, 0.3)" }}>
            <div className="space-y-6 text-sm">
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>1. Introduction</h3>
                <p>Welcome to AARTHIQ ("Company", "we", "our", "us"). These Terms of Service govern your use of our website and mobile application (together or individually "Service") operated by AARTHIQ. Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You acknowledge that you have read and understood these Agreements, and agree to be bound by them.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>2. Communications</h3>
                <p>By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing us at support@aarthiq.com.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>3. Purchases</h3>
                <p>If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including but not limited to, your credit or debit card number, the expiration date of your card, your billing address, and your shipping information.</p>
                <p className="mt-2">You represent and warrant that: (i) you have the legal right to use any card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>4. Content</h3>
                <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>5. Prohibited Uses</h3>
                <p>You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>In any way that violates any applicable national or international law or regulation.</li>
                  <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
                  <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>6. Analytics</h3>
                <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>7. Intellectual Property</h3>
                <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of AARTHIQ and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of AARTHIQ.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>8. Error Reporting and Feedback</h3>
                <p>You may provide us with information and feedback regarding errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service ("Feedback"). You acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; (ii) the Company may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information or proprietary information from you or any third party; and (iv) the Company is not under any obligation of confidentiality with respect to the Feedback.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>9. Termination</h3>
                <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of these Terms.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>10. Governing Law</h3>
                <p>These Terms shall be governed and construed in accordance with the laws of the United States of America, without regard to its conflict of law provisions.</p>
                <p className="mt-2">Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>11. Changes to Service</h3>
                <p>We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>12. Amendments to Terms</h3>
                <p>We may amend these Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#fa6724" }}>13. Contact Us</h3>
                <p>If you have any questions about these Terms, please contact us at <span style={{ color: "#e30584" }}>legal@aarthiq.com</span>.</p>
              </div>
            </div>
          </ScrollArea>
          
          <div className="flex items-center mt-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 mr-4" 
              onClick={() => setAccepted(!accepted)}
              style={{ 
                borderColor: accepted ? "#e30584" : "gray", 
                color: accepted ? "#e30584" : "inherit",
                backgroundColor: accepted ? "rgba(227, 5, 132, 0.1)" : "transparent"
              }}
            >
              <Check className={`h-4 w-4 ${accepted ? "opacity-100" : "opacity-0"}`} style={{ color: "#e30584" }} />
              I Accept
            </Button>
            <p className="text-sm text-muted-foreground">
              By clicking "I Accept", you agree to be bound by these terms and conditions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 