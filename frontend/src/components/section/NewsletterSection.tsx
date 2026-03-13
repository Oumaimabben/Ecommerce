import React from "react";
import { Mail } from "lucide-react";

const NewsletterSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
<div className="border-b border-gray-400 mb-8" />

        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          {/* Left content */}
          <div className="flex items-start gap-6 max-w-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 text-gray-500">
              <Mail className="h-7 w-7" />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-red-500">
                Join our newsletter for £10 offs
              </p>

              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Get our emails for info on new items,
                <br />
                sales and much more.
              </h2>

              <p className="text-sm text-gray-500">
                Register now to get latest updates on promotions & coupons.
                Don’t worry, we not spam!
              </p>
            </div>
          </div>

          {/* Right form */}
          <form className="flex w-full max-w-md items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />

            <button
              type="submit"
              className="rounded-md bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-center text-xs text-gray-400 md:text-right">
          By subscribing you agree to our{" "}
          <span className="cursor-pointer text-red-500 hover:underline">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="cursor-pointer text-red-500 hover:underline">
            Privacy & Cookies Policy
          </span>
          .
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
