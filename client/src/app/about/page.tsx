"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            About Our School Management System
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>
            Our School Management System is a modern, user-friendly platform
            designed to simplify and streamline school operations. Whether
            you're an administrator, teacher or student, our system brings all
            essential tools into one accessible dashboard.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Why Choose Us?</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2">
          <ul className="list-disc list-inside">
            <li>Secure and centralized student information system</li>
            <li>Mobile-friendly interface for on-the-go access</li>
            <li>Seamless communication between components</li>
            <li>technical support and regular updates</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>
            We aim to empower schools with technology that enhances efficiency,
            transparency, and collaboration. Our system helps institutions focus
            more on education and less on paperwork.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
