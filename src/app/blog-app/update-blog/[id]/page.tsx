import { getBlogById } from "@/api/gorest";
import CreateBlogFrom from "@/components/forms/create-blog-form";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const data = await getBlogById(params.id);

  return (
    <>
      <CreateBlogFrom type="UPDATE" blog={data} />
    </>
  );
};

export default page;
