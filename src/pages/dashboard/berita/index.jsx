import AddDataButton from "@/components/layouts/functions/AddDataButton";
import DeleteButton from "@/components/layouts/functions/DeleteButton";
import EditButton from "@/components/layouts/functions/EditButton";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
// import DeleteInformationModal from "@/components/layouts/modals/DeleteInformationModal";
import NotFound from "@/components/layouts/globals/NotFound";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/layouts/globals/Loading";
// import informationApi from "@/api/modules/information.api";
import { toast } from "react-toastify";
// import Pagination from "@/components/layouts/functions/Pagination";
// import LoadingPagination from "@/components/layouts/globals/LoadingPagination";
import { formatDateWithTimeToIndo } from "@/helpers/dateHelper";

export default function DashboardNewsPage() {
  const router = useRouter();

  const [news, setNews] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);
  //
  const [selectedInformationIdToDelete, setSelectedInformationIdToDelete] =
    useState(null);

  const fetchNewsData = async () => {
    setNews([
      {
        id: 1,
        slug: "slug-1",
        title: "Judul 1",
        status: "Aktif",
        createdAt: "2023-08-01T00:00:00.000Z",
      },
      {
        id: 2,
        slug: "slug-2",
        title: "Judul 2",
        status: "draft",
        createdAt: "2023-08-02T00:00:00.000Z",
      },
    ]);
    setIsDataLoaded(true);

    // const { response, error } = await informationApi.blog.getAllBlogs({
    //   page,
    // });
    // if (response) {
    //   setNews(response.data);
    //   setTotalPage(response.pagination.lastPage);
    //   setTimeout(() => {
    //     setIsDataLoaded(true);
    //   }, 1000);
    // }
    // if (error) {
    //   setErrorDataLoaded(true);
    //   toast.error("Gagal memuat data");
    // }
  };
  //
  useEffect(() => {
    fetchNewsData();
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>BERITA</DashboardHeader>

      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="px-10 pb-16 h-full">
          <div className="pt-4 flex justify-between items-center">
            <h2 className="font-bold text-2xl">Daftar Berita</h2>
            {/*  */}
            <AddDataButton
              onClick={() => router.push("/dashboard/berita/tambah")}
            >
              Buat
            </AddDataButton>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="w-full text-black flex items-center gap-2 py-3 px-1 border-b-2 border-gray-300 text-lg">
                  <th className="w-[5%] text-start">No</th>
                  <th className="w-[40%] text-start">Judul</th>
                  <th className="w-[15%] text-start">Status</th>
                  <th className="w-[20%] text-start">Dibuat Pada</th>
                  <th className="w-[20%] text-start">Aksi</th>
                </tr>
              </thead>
              {news?.length > 0 ? (
                <tbody>
                  {news.map((news, i) => (
                    <tr
                      key={i}
                      className="text-black flex items-center gap-2 py-5 px-1 border-b-2 border-gray-300"
                    >
                      <td className="w-[5%] text-start ps-2">{i + 1}</td>
                      <td className="w-[40%] text-start underline hover:text-blue-500 break-words">
                        <Link href={`/berita/${news.slug}`} target="_blank">
                          {news.title}
                        </Link>
                      </td>
                      <td
                        className={`w-[12%] me-[3%] text-center py-1.5 rounded font-medium capitalize ${
                          news.status === "draft"
                            ? "bg-[#E2E2E2]"
                            : "bg-[#9CFF9C]"
                        }`}
                      >
                        {news.status}
                      </td>
                      <td className="w-[20%] text-start">
                        {formatDateWithTimeToIndo(news.createdAt)}
                      </td>
                      <td className="w-[20%] text-start flex items-center gap-2">
                        <EditButton
                          onClick={() =>
                            router.push(
                              `/dashboard/berita/tambah?editNewsId=${news.id}&editNewsSlug=${news.slug}`
                            )
                          }
                        >
                          Edit
                        </EditButton>
                        {/*  */}
                        <DeleteButton
                          onClick={() => {
                            setSelectedNewsIdToDelete(news.id);
                            document
                              .getElementById("delete_news_modal")
                              .showModal();
                          }}
                        >
                          Hapus
                        </DeleteButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <NotFound message="Tidak ada data berita" />
              )}
            </table>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {/* <DeleteInformationModal
        informationId={selectedInformationIdToDelete}
        setInformationId={setSelectedInformationIdToDelete}
        fetchNewsData={fetchNewsData}
      /> */}
    </div>
  );
}
