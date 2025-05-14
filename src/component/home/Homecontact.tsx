import { Button } from "@/components/ui/button";
const Homecontact = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-pink-500 mb-4">LET'S TALK</h2>
        <p className="text-gray-600 mb-8">
          The best learning platform is built but none is perfect for your
          needs.
          <br />
          Do not take anyone for it. We would love to get to know you and your
          <br />
          real-time needs. Catch up for free.
        </p>
        <div className="flex justify-center space-x-4">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
            FIND OUT MORE
          </Button>
          <Button
            variant="outline"
            className="border-pink-500 text-pink-500 hover:bg-pink-50"
          >
            GET COURSES NOW
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Homecontact;
