import Footer from "www/components/section/landing/footer";
import AiSearch from "www/components/section/landing/landing-search";
import Nav from "www/components/section/landing/nav";

export default function Home() {
  return (

    <>
      <main className=" w-full h-screen flex flex-col items-center justify-between  font-sans">
    <Nav />
        <div className="flex flex-col items-center justify-center gap-4 w-full  flex-nowrap">
          <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
           What's on your mind?
          </h2>
          <AiSearch />
        </div>
        
       <Footer />
      </main>
   
    </>
  );
}
