import SideMenu from "@/components/SideMenu";

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main className='flex'>
        <SideMenu/>
        <section className="sectionBg p-4 ml-14 sm:ml-0 w-screen min-h-screen">{children}</section>
    </main>
  )
}

export default layout