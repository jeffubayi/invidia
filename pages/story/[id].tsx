import { fetcher } from "../../utils";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast";
import { Label, TextInput, Button,Card } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";

const Story = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/stories/${id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button color="light" onClick={() => router.back()}>
          <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
        </Button>
       
        <Button
          color="failure"
          onClick={async () => {
            try {
              await supabase
                .from("stories")
                .delete()
                .eq("id", id)
                .then(() => {
                  router.push(`/story`);
                  toast.success(`Story ${id} Deleted`);
                });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Delete
        </Button>
      </div>
      
      <Formik
        initialValues={{
          label: data?.story?.label,
          content: data?.story?.content,
          id,
        }}
        validate={(values) => {}}
        onSubmit={async (values) => {
          try {
            const { label, content } = values;
            await supabase
              .from("stories")
              .update([
                {
                  label,
                  content,
                },
              ])
              .match({ id: id })
              .then(() => {
                router.push(`/story`);
                toast.success(`Story ${id} Updated`);
              });
          } catch (err) {
            console.log(err);
            toast.error(`Error ${id} Updating`);
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Card>
          <h2 className="inline-block align-baseline  text-2xl text-white-500 hover:text-white-800 mb-2 dark:text-white">
          View story :{} {id}
        </h2>
          <div className="mb-2 block">
                <Label htmlFor="email1" value="Story Label" />
              </div>
              <TextInput
                name="label"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}id="label"
                type="text"
                placeholder="label"
              />
            <div className="mb-2 block">
                <Label htmlFor="password1" value="Story Content" />
              </div>
              <TextInput
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}id="content"
                type="text"
                placeholder="Content"
              />
              <Button type="submit"  disabled={isSubmitting}>Update</Button>
            </Card>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Story;
