import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
        <main className="w-full h-screen flex flex-col justify-center items-center bg-gray-50 sectionBg px-4 bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative text-center space-y-6 z-10 px-6">
            <h1 className="text-6xl font-extrabold text-white heading">
            Oops!
            </h1>
            <p className="text-xl text-white mb-4">
            The page you&apos;re looking for cannot be found.
            </p>
            <p className="text-lg text-white">
            Please check the URL or go back to the{" "}
            <Link
                href="/"
                className="text-primary hover:text-primary-dark font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:underline"
            >
                homepage
            </Link>
            .
            </p>
            <div className="mt-8">
            <p className="text-sm text-white">
                If you need assistance, feel free to contact our support.
            </p>
            </div>
        </div>
        <div className="absolute inset-0">
            <Image
            src="https://res.cloudinary.com/dahgxnpog/image/upload/v1734534690/404_bbm9ch.png"
            alt="404 Not Found"
            layout="fill"
            objectFit="cover"
            priority
            />
        </div>
        </main>
    );
};

export default NotFound;
