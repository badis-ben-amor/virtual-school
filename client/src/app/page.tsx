import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarDays,
  Music,
  GraduationCap,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] overflow-hidden">
        <Image
          src="/school_01.jpg"
          alt="School"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">
              Welcome To School Management Systeme
            </h1>
            <p className="mb-4">
              Empowering students to achieve their full potential in a nurturing
              and innovative learning environment.
            </p>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-2">About Evergreen Academy</h2>
        <p className="text-gray-700 max-w-4xl">
          At Evergreen Academy, we are committed to providing a transformative
          educational experience that fosters intellectual curiosity, personal
          growth, and social responsibility. Our dedicated faculty and
          state-of-the-art facilities create a vibrant learning community where
          students thrive.
        </p>
      </section>

      {/* Recent News */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Recent News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <Image
              src="/school_01.jpg"
              alt="Science Fair"
              width={400}
              height={200}
              className="rounded-t-md"
            />
            <CardContent className="p-4">
              <h3 className="font-bold">Annual Science Fair</h3>
              <p className="text-sm text-gray-600">
                Exciting projects and discoveries
              </p>
            </CardContent>
          </Card>
          <Card>
            <Image
              src="/school_02.jpg"
              alt="Innovation Lab"
              width={400}
              height={200}
              className="rounded-t-md"
            />
            <CardContent className="p-4">
              <h3 className="font-bold">Innovation Lab Showcase</h3>
              <p className="text-sm text-gray-600">
                Cutting-edge student innovations
              </p>
            </CardContent>
          </Card>
          <Card>
            <Image
              src="/school_01.jpg"
              alt="Basketball"
              width={400}
              height={200}
              className="rounded-t-md"
            />
            <CardContent className="p-4">
              <h3 className="font-bold">Varsity Basketball Championship</h3>
              <p className="text-sm text-blue-600">Victory celebration</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <CalendarDays className="w-5 h-5 mt-1" />
            <div>
              <p className="font-medium">Parent-Teacher Conferences</p>
              <p className="text-sm text-gray-600">October 20, 2024</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Music className="w-5 h-5 mt-1" />
            <div>
              <p className="font-medium">Spring Concert</p>
              <p className="text-sm text-gray-600">May 15, 2025</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <GraduationCap className="w-5 h-5 mt-1" />
            <div>
              <p className="font-medium">Graduation Ceremony</p>
              <p className="text-sm text-gray-600">June 5, 2025</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <p className="font-bold">Ethan Harper</p>
              <p className="text-sm text-gray-500">June 10, 2024</p>
              <div className="text-blue-500 mb-2">★★★★★</div>
              <p>
                Evergreen Academy has been an incredible journey for me. The
                teachers are supportive, and the curriculum is challenging yet
                rewarding. I've grown so much academically and personally.
              </p>
              <div className="flex space-x-4 mt-2 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" /> 12
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> 2
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="font-bold">Sophia Clark</p>
              <p className="text-sm text-gray-500">May 22, 2024</p>
              <div className="text-blue-500 mb-2">★★★★☆</div>
              <p>
                I've enjoyed my time at Evergreen. The campus is beautiful, and
                there are many extracurricular activities to get involved in.
                The community is welcoming and inclusive.
              </p>
              <div className="flex space-x-4 mt-2 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" /> 8
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> 1
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 mt-8 text-center text-sm text-gray-600">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <Link href="#">About Us</Link>
          <Link href="#">Admissions</Link>
          <Link href="#">Academics</Link>
          <Link href="#">News & Events</Link>
          <Link href="#">Contact</Link>
        </div>
        <div className="flex justify-center space-x-4 mb-2">
          <Link href="#">
            <i className="fab fa-facebook"></i>
          </Link>
          <Link href="#">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link href="#">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
        <p>© 2025 School Management Systeme. All rights reserved.</p>
      </footer>
    </main>
  );
}
