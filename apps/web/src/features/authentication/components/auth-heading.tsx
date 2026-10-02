type AuthHeadingProps = {
  title: string;
  description: string;
};

export function AuthHeading({ title, description }: AuthHeadingProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
