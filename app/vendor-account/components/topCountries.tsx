import AE from "@/dist/images/countries/ae.svg";
import JP from "@/dist/images/countries/jp.svg";
import MY from "@/dist/images/countries/my.svg";
import PK from "@/dist/images/countries/pk.svg";
import SA from "@/dist/images/countries/sa.svg";
import US from "@/dist/images/countries/us.svg";
import Image from "next/image";

const TopCountries = () => {
  const countries = [
    { icon: AE, name: "United Arab Emirates", amount: "$130.00" },
    { icon: JP, name: "Japan", amount: "$110.00" },
    { icon: MY, name: "Malaysia", amount: "$100.00" },
    { icon: PK, name: "Pakistan", amount: "$80.00" },
    { icon: SA, name: "Saudi Arabia", amount: "$80.00" },
    { icon: US, name: "United States", amount: "$70.00" },
  ];

  return (
    <div className="rounded-md bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-semibold">Top Countries</h3>
      {countries.map((country, index) => (
        <div key={index} className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={country.icon}
              alt={country.name}
              width={50}
              className="border"
            />
            <span className="ml-2">{country.name}</span>
          </div>
          <span>{country.amount}</span>
        </div>
      ))}
    </div>
  );
};

export default TopCountries;
