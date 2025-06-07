"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { ProductsContext } from "@/context/productContext";
import axios from "axios";
import { Product } from "@/lib/constants";
import { CldImage } from "next-cloudinary";

export default function CheckoutPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productinfo, setProductinfo] = useState<Product[]>([]);

  let subtotal = 0;
  let total = 0;
  let shippingFee = 0;

  useEffect(() => {
    const unique_id = [...new Set(selectedProducts)];
    try {
      const fetchProduct = async () => {
        const response = await axios.get(
          "/api/product?ids=" + unique_id.join(",")
        );
        setProductinfo(response.data.products);
      };
      fetchProduct();
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }, [selectedProducts]);

  if (productinfo?.length) {
    for (let i = 0; i < productinfo.length; i++) {
      subtotal +=
        productinfo[i].price *
        selectedProducts.filter((item: any) => item === productinfo[i].id)
          .length;
    }

    shippingFee = subtotal > 1000 ? 0 : 50;
    total = subtotal + shippingFee;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear cart on successful payment

      router.push("/order-confirmation");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (productinfo.length === 0) {
    return (
      <div className="container py-12 text-center w-full max-w-screen overflow-x-hidden mx-auto px-2 md:px-8 lg:px-16">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push("/products")}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 w-full max-w-screen overflow-x-hidden mx-auto px-2 md:px-8 lg:px-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Shipping and Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input id="lastName" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address*</Label>
                <Input id="address" required />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City*</Label>
                  <Input id="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code*</Label>
                  <Input id="postalCode" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number*</Label>
                <Input id="phone" type="tel" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input id="email" type="email" required />
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="font-medium">Payment Method</h3>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid gap-4 grid-cols-2"
                >
                  <div>
                    <RadioGroupItem
                      value="credit-card"
                      id="credit-card"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="credit-card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>Credit Card</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="cod"
                      id="cod"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="cod"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>Cash on Delivery</span>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number*</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        required
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date*</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV*</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment
                  </>
                ) : (
                  `Pay ₹${total.toFixed(2)}`
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {productinfo &&
                  productinfo.map((item: any, Index: any) => (
                    <div key={Index} className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          <CldImage
                            src={item.image}
                            alt={item.title}
                            fill
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{item.price} ×
                            {
                              selectedProducts.filter(
                                (id: string) => id === item.id
                              ).length
                            }
                          </p>
                        </div>
                      </div>
                      <span>
                        ₹
                        {(
                          item.price *
                          selectedProducts.filter(
                            (id: string) => id === item.id
                          ).length
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? "Free" : `₹${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Orders are processed and shipped within 1-2 business days.
                </p>
                <p>Estimated delivery time: 3-5 business days.</p>
                <p>Free shipping on orders over ₹1000.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
