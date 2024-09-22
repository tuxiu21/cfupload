import Login from "@/components/login";

export default function Page() {
  return (
    <div className=" h-full w-full bg-cover bg-no-repeat bg-center flex justify-center items-center">
      <div className="card glass sm:w-96">
        <div className="card-body">
          <Login />
        </div>
      </div>
    </div>
  );
}
