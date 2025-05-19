import PageHeader from "@/components/page-header"
import ContactForm from "@/components/contact-form"

export default function Contact() {
  return (
    <div className="min-h-screen relative pt-[120px]">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/artwork-collage.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlend: "multiply",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main content */}
        <main className="flex-1 flex flex-col p-6">
          {/* Page Header */}
          <div className="container mx-auto mb-8">
            <PageHeader title="CONTACT" />
          </div>

          <div className="container mx-auto max-w-xl">
            <div className="bg-black/50 backdrop-blur-sm rounded-md p-6">
              <ContactForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
