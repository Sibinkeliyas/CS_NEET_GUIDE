
// import Homelayout from '@/components/home/layout';
export default function Home() {
  return (
    <>
      {/* <Homelayout/> */}
      <section className=" min-h-screen mx-auto bg-white lg:py-[200px] py-[50px] ">
        <div className="max-w-[486px] m-auto text-center mb-[50px]">
          <h3 className="text-[#101010] font-semibold text-[58px] mb-[20px]">
            Pricing Plans
          </h3>
          <p
            className="text-[#585858] text-[20px] font-light  text-center
"
          >
            Our pricing plans are designed to be affordable, flexible, and
            tailored to your unique needs.
          </p>
        </div>
      </section>
    </>
  );
}
