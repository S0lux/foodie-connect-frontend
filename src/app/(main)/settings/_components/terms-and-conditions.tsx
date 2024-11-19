import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useAuth from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";
import { useRouter } from "next/navigation";

const TermsAndConditions = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const upgradeHead = useAuth.useUpgradeHead();
  const sections = [
    {
      title: "1. DEFINITIONS",
      content: [
        {
          title: "1.1. System",
          text: "Refers to the restaurant management software provided by our company.",
        },
        {
          title: "1.2. Head Account",
          text: "Refers to the account with highest management privileges in the restaurant management system.",
        },
        {
          title: "1.3. User",
          text: "Refers to the individual or organization registering for and upgrading to a Head account.",
        },
      ],
    },
    {
      title: "2. UPGRADE REQUIREMENTS",
      content: [
        {
          title: "2.1. Basic Requirements",
          list: [
            "Must be the owner or legally authorized representative of the restaurant",
            "Must have used the system for at least 30 days",
            "No terms of use violations in the past 6 months",
            "All previous fees must be paid in full",
          ],
        },
        {
          title: "2.2. Required Documents",
          list: [
            "Valid business license",
            "Valid identification documents",
            "Premises lease agreement or ownership documents (if applicable)",
            "Authorization letter (if not the owner)",
          ],
        },
      ],
    },
    {
      title: "3. RIGHTS AND RESPONSIBILITIES",
      content: [
        {
          title: "3.1. Rights",
          list: [
            "Manage all staff and assign permissions within the system",
            "Full access to financial reports and data analytics",
            "Customize interface and functions according to needs",
            "Priority technical support 24/7",
            "Free system usage training",
          ],
        },
        {
          title: "3.2. Responsibilities",
          list: [
            "Maintain account and system data security",
            "Comply with customer data protection regulations",
            "No sharing of access rights with third parties",
            "Immediate reporting of security issues or system errors",
            "Ensure accuracy of information entered into the system",
          ],
        },
      ],
    },
    {
      title: "4. TERM AND TERMINATION",
      content: [
        {
          title: "4.1. Term",
          list: [
            "Minimum 12 months from upgrade date",
            "Automatic renewal unless cancellation notice received",
            "30-day notice required for cancellation",
          ],
        },
        {
          title: "4.2. Contract Termination",
          list: [
            "Serious violation of terms of use",
            "Failure to pay fees on time",
            "User request for termination",
            "Company discontinuation of service",
          ],
        },
      ],
    },
    {
      title: "5. SECURITY AND DATA",
      content: [
        {
          title: "5.1. Security Commitment",
          list: [
            "Data encryption according to international standards",
            "No sharing of information with third parties",
            "Regular data backup",
            "Compliance with personal data protection regulations",
          ],
        },
        {
          title: "5.2. Data Ownership",
          list: [
            "User owns all data",
            "Right to export data upon contract termination",
            "Data deletion upon request",
          ],
        },
      ],
    },
    {
      title: "6. LIMITATION OF LIABILITY",
      content: [
        {
          title: "6.1. The Company is not responsible for:",
          list: [
            "Damages due to uncontrollable incidents",
            "Data loss due to user error",
            "Service interruption due to maintenance",
            "Indirect damages from system use",
          ],
        },
      ],
    },
    {
      title: "7. GENERAL TERMS",
      content: [
        {
          title: "7.1. Terms Modification",
          list: [
            "30-day advance notice",
            "User's right to reject changes",
            "Effective after notification period",
          ],
        },
        {
          title: "7.2. Applicable Law",
          list: [
            "Compliance with laws of the country",
            "Dispute resolution in competent courts",
            "Priority for mediation in case of disagreements",
          ],
        },
      ],
    },
    {
      title: "8. CONTACT",
      content: [
        {
          title: "Contact Information",
          list: [
            "Support Email: 22520679@gm.uit.edu.vn",
            "Hotline: 0916202016",
            "Office Address: Cầu Thị Nghè, Phường 12, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
            "Working Hours: 8:00 AM - 5:00 PM (Monday - Friday)",
          ],
        },
      ],
    },
  ];

  const handleAccept = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await upgradeHead.mutateAsync(userId);
      toast({
        title: "Success",
        description:
          "Your account has been successfully upgraded to Head Account.",
      });
      router.push("/login");
    } catch (error) {
      switch ((error as ErrorType).code) {
        case "NOT_AUTHENTICATED":
          toast({
            title: "Error",
            description: "You are not authenticated",
            variant: "destructive",
          });
          break;
        case "NOT_AUTHORIZED":
          toast({
            title: "Error",
            description: "You are not authorized",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
          break;
      }
    }
    setLoading(false);
  };

  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Terms and Conditions for Head Account Upgrade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <Alert className="mb-6">
            <AlertDescription>
              Please read these terms and conditions carefully before upgrading
              to a Head Account.
            </AlertDescription>
          </Alert>

          <Accordion type="single" collapsible className="w-full">
            {sections.map((section, index) => (
              <AccordionItem key={index} value={`section-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex} className="mb-4">
                      <h4 className="mb-2 font-medium">{subsection.title}</h4>
                      {"text" in subsection && (
                        <p className="mb-2 text-gray-600">{subsection.text}</p>
                      )}
                      {"list" in subsection && (
                        <ul className="list-disc space-y-1 pl-6">
                          {subsection.list.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-gray-600">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>

        <div className="mt-2 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked === true)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and agree to the terms and conditions
            </label>
          </div>

          <p className="font-bold text-red-600">
            After a successful upgrade, you will be redirected to the login
            page.
          </p>
          <Button
            className="w-full"
            disabled={!accepted}
            size={"lg"}
            onClick={() => handleAccept()}
          >
            {loading ? "Loading..." : " Upgrade to Head Account"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TermsAndConditions;
