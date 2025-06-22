import RequestForm from '@/components/request-form';

export default async function RequestPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Submit a Request
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Can't find what you're looking for? Let us know your requirements, and we'll help you find the right pandit.
        </p>
      </div>
      <RequestForm />
    </div>
  );
}
