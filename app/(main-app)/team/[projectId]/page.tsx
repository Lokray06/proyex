export default function Team({
  params,
}: {
  params: { projectId: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Team View</h1>
      <p className="text-muted-foreground">
        Project ID: {params.projectId}
      </p>
      <p className="text-muted-foreground mt-2">
        (Placeholder content goes here)
      </p>
    </div>
  )
}