const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;

  return <div>This is course Id: {courseId}</div>;
};

export default CourseIdPage;
