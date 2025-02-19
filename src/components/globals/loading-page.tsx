import Spinner from "../ui/spinner";

const LoadingPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-1">
      <Spinner />
      Loading....
    </div>
  );
};

export default LoadingPage;
