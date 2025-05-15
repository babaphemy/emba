import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            TRANSFORM YOUR
            <br />
            <span className="text-pink-500">WORKFORCE</span>
            <br />
            <span className="text-pink-500">CLASSROOM</span>
            <br />
            <span className="text-pink-500">CAREER</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Power your innovation, transform with confidence,
            <br />
            boost your expertise, and advance your career.
          </p>
        </div>
        <Image
          src="/api/placeholder/400/300"
          alt="Classroom"
          className="mt-8 rounded-lg shadow-lg"
          width={400}
          height={300}
        />
      </div>
    </section>
  );
};
export default Hero;
