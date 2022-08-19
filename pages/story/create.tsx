import { useRouter } from "next/router";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { Label, TextInput, Button, Card } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";

const Story = () => {
  const router = useRouter();
  return (
    <div className="m-4">
      <div className="flex items-center justify-between mb-4">
        <Button color="light" onClick={() => router.back()}>
          <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
        </Button>

        <Button.Group>
          <Button color="gray">Single</Button>
        </Button.Group>
      </div>

      <Formik
        initialValues={{
          label: "",
          content: "",
          created_at: new Date(),
        }}
        validate={(values) => {}}
        onSubmit={async (values) => {
          try {
            await fetch("/api/stories/create", {
              method: "POST",
              body: JSON.stringify({ values }),
            }).then(() => {
              router.push(`/story`);
              toast.success("Story added successfully", {
                icon: "📒📖",
              });
            });
          } catch (err) {
            console.log(err);
            toast.error("Error creating story");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Card>
              <h2 className="inline-block align-baseline  text-2xl text-white-500 hover:text-white-800 mb-2 dark:text-white">
                Create story
              </h2>
              <div className="mb-2 block">
                <Label htmlFor="label" value="Story Label" />
              </div>
              <TextInput
                id="label"
                type="text"
                placeholder="Add story label"
                required={true}
                name="label"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}
              />
              <p className="text-red-500 text-xs italic">
                {errors.label && touched.label && errors.label}
              </p>
              <div className="mb-2 block">
                <Label htmlFor="content" value="Story Content" />
              </div>
              <TextInput
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                required={true}
                id="content"
                type="text"
                placeholder="Content"
              />
              <p className="text-red-500 text-xs italic">
                {errors.content && touched.content && errors.content}
              </p>

              <Button type="submit" disabled={isSubmitting}>
                Create
              </Button>
            </Card>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Story;
