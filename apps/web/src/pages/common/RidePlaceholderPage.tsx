import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

type RidePlaceholderPageProps = {
  title: string;
  description: string;
};

export function RidePlaceholderPage({ title, description }: RidePlaceholderPageProps) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
    </Card>
  );
}
