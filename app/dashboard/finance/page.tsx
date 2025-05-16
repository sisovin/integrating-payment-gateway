
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function FinancePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Finance / Payments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>Pay with PayWay</CardHeader>
          <CardContent>
            <Link href="/payment/payway">
              <button className="w-full bg-blue-600 text-white py-2 rounded">Go to PayWay</button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Pay with Bakong</CardHeader>
          <CardContent>
            <Link href="/payment/bakong">
              <button className="w-full bg-green-600 text-white py-2 rounded">Go to Bakong</button>
            </Link>
          </CardContent>
        </Card>
      </div>
      {/* Add transaction history and other finance widgets below */}
    </div>
  );
}
