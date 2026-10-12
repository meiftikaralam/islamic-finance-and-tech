import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/** Email subscribe box (posts to the Kit form). Rendered in the site layout, above the footer on every page. */
export function SubscribeBox() {
  return (
    <div className="mt-10 bg-white border border-[#e3e3e3] rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold mb-2">Get regular updates by email</h3>
      <p className="text-sm text-[#666] mb-4">
        You will receive emails with new lessons and editions. Educational only — never investment advice.
      </p>
      <form
        action="https://app.kit.com/forms/10015197/subscriptions"
        method="post"
        className="flex gap-2 justify-center flex-wrap"
      >
        <Input
          type="email"
          name="email_address"
          required
          placeholder="you@example.com"
          aria-label="Email address"
          className="max-w-[280px]"
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );
}
