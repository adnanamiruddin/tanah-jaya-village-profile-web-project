import { selectUser } from "@/redux/features/userSlice";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function DashboardHomePage() {
  const { user } = useSelector(selectUser);

  return (
    <div className="overflow-hidden">
      <div>
        <Image
          priority
          src="/image-home-hero.jpg"
          alt="Homepage Image"
          width={1920}
          height={1080}
          className="w-full h-80 object-cover"
        />

        <div className="ms-24 -mt-24 w-max relative">
          <Image
            src="/icon-man.png"
            alt={user.username || "User"}
            width={500}
            height={500}
            className="w-40 h-40 object-cover rounded-full"
            // Disabled right click
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      <div className="ps-20 pe-12 py-8">
        <div className="w-full">
          <h5 className="font-bold text-4xl">
            Selamat datang, {`${user.firstName} ${user.lastName}` || "User"}
          </h5>
        </div>
      </div>
    </div>
  );
}
