import { FaHeadset } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import ProfileWrapper from "../components/ProfileWrapper";

const SupportTicket = () => {
  const tickets = [
    {
      name: "Product Broken. I need refund",
      category: "Urgent",
      status: "Open",
      date: "Apr 13, 2024",
      indication: "Product Problem",
    },
    {
      name: "When will myu product arrive?",
      category: "Normal",
      status: "Open",
      date: "Aug 15, 2024",
      indication: "Normal Question",
    },
    {
      name: "Payment method is not working",
      category: "Urgent",
      status: "Open",
      date: "Aug 22, 2024",
      indication: "Open",
    },
  ];

  return (
    <ProfileWrapper>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <FaHeadset className="mr-2 text-2xl text-red-500" />
          <h1 className="text-2xl font-bold">Support Ticket</h1>
        </div>
        <div className="mx-auto w-full rounded-lg">
          <div className="flex flex-col gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.name}
                className="flex items-center justify-between rounded-md bg-white px-6 py-4 shadow-md"
              >
                <div>
                  <h1 className="font-normal text-gray-800">{ticket.name}</h1>
                  <div className="flex gap-2">
                    <button className="rounded-full bg-rose-200 px-4 py-1 text-sm text-red-700">
                      {ticket.category}
                    </button>
                    <button className="rounded-full bg-green-200 px-4 py-1 text-sm text-green-700">
                      {ticket.status}
                    </button>
                    <p className="text-gray-600">{ticket.date}</p>
                    <p className="text-slate-600">{ticket.indication}</p>
                  </div>
                </div>
                <div>
                  <FaArrowRightLong className="cursor-pointer text-2xl text-gray-900 hover:text-3xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default SupportTicket;
