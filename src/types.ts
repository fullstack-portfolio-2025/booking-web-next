export type Money = { currency: "USD" | "VND"; amount: number };
export type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  price: Money;
};
export type ServiceList = { data: Service[] };
export type Health = { status: string };
