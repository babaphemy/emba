import { Card, CardContent } from "@/components/ui/card";
const Coursecard = () => {
  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <img
                src="/api/placeholder/300/200"
                alt="Workforce"
                className="w-full rounded mb-4"
              />
              <h3 className="text-white text-2xl font-bold mb-2">
                IT'S TIME TO EVOLVE YOUR
                <br />
                <span className="text-pink-500">WORKFORCE</span>
              </h3>
              <p className="text-gray-400 mb-6">REAL WORLD, REAL RESULTS</p>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  Expand beyond conventional approaches. Award-winning industry
                  experience blended to engage and unlock peak performance with
                  cutting-edge content that addresses every team need.
                </p>
                <p>
                  Elevate potential and performance with real world skills
                  taught by industry experts.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <img
                src="/api/placeholder/300/200"
                alt="Classroom"
                className="w-full rounded mb-4"
              />
              <h3 className="text-white text-2xl font-bold mb-2">
                A REAL WORLD CURRICULUM FOR YOUR
                <br />
                <span className="text-pink-500">CLASSROOM</span>
              </h3>
              <p className="text-gray-400 mb-6">
                ELITE-LEVEL INSTRUCTION
                <br />
                GAME BEYOND THEORY
              </p>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  We enable education providers from leading universities
                  through vocational training schools to transform their
                  classrooms with engaging content.
                </p>
                <p>
                  All knowledge and stories from leading professionals in modern
                  careers and emerging new fields.
                </p>
                <p>
                  Our training content boosts learning outcomes and places
                  students job ready.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <img
                src="/api/placeholder/300/200"
                alt="Career"
                className="w-full rounded mb-4"
              />
              <h3 className="text-white text-2xl font-bold mb-2">
                THE KEY TO LEVELING UP YOUR
                <br />
                <span className="text-pink-500">CAREER</span>
              </h3>
              <p className="text-gray-400 mb-6">
                AN AFFORDABLE MPA
                <br />
                JOB MARKET ADVANTAGE
              </p>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  Gain the power advantage over competitors and stay ahead in
                  the marketplace through bespoke courses designed to streamline
                  and accelerate your career objectives.
                </p>
                <p>
                  Gain impactful coaching and mentoring with our courses
                  designed and delivered by industry, real world experts. We
                  developed world-class content to help students advance their
                  professional goals and enhance their resumes for a competitive
                  advantage.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default Coursecard;
