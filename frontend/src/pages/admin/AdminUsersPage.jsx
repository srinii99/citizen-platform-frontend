import {
  useEffect,
  useState,
} from "react";

import {
  getAdminUsers,
} from "../../api/adminUserApi";

import { useNavigate } from "react-router-dom";

const AdminUsersPage =
  () => {

    const navigate =
        useNavigate();
    
    const [
      users,
      setUsers,
    ] = useState([]);

    const [
        search,
        setSearch,
    ] = useState("");

    const [
      loading,
      setLoading,
    ] = useState(true);

    useEffect(() => {

      fetchUsers();

    }, []);

    const fetchUsers =
      async () => {

        try {

          const data =
            await getAdminUsers();

          setUsers(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }
      };

    if (loading) {

      return (
        <div>
          Loading...
        </div>
      );
    }

    const filteredUsers =
        users.filter((user) => {

            const searchTerm =
            search.toLowerCase();

            return (

            user.name
                ?.toLowerCase()
                .includes(searchTerm)

            ||

            user.mobile
                ?.includes(searchTerm)

            ||

            user.state
                ?.toLowerCase()
                .includes(searchTerm)

            );

        });

    return (

      <div className="p-6">

        <div className="mb-6">

            <h1 className="text-3xl font-bold">
                Citizens
            </h1>

            <p className="text-gray-500 mt-1">
                Manage citizen profiles and applications
            </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

            <div className="bg-white p-5 rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">
                Total Citizens
                </p>
                <p className="text-2xl font-bold mt-1">
                {users.length}
                </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">
                Profile Complete
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                {
                    users.filter(
                    u => u.profile_completed
                    ).length
                }
                </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">
                Incomplete Profiles
                </p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                {
                    users.filter(
                    u => !u.profile_completed
                    ).length
                }
                </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border">
                <p className="text-sm text-gray-500">
                Applications
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                {
                    users.reduce(
                    (sum, user) =>
                        sum + (user.applicationsCount || 0),
                    0
                    )
                }
                </p>
            </div>

            </div>

        </div>

        <div className="mb-6">

            <input
                type="text"
                placeholder="Search by name, mobile or state..."
                value={search}
                onChange={(e) =>
                setSearch(e.target.value)
                }
                className="
                w-full
                md:w-96
                px-4
                py-3
                border
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
            />

        </div>

        <div className="
            px-6
            py-4
            border-b
            bg-slate-50
            ">

            <p className="text-sm text-gray-600">

                Showing

                {" "}

                <span className="font-semibold">
                {filteredUsers.length}
                </span>

                {" "}citizens

            </p>

            </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ">
            <div className="overflow-x-auto">


          <table className="w-full">

            
            <thead className="bg-slate-50 border-b">

                <tr>

                    <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    Name
                    </th>

                   
                     <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    Mobile
                    </th>

                    
                    <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    State
                    </th>

                   
                    <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    District
                    </th>

                   
                    <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    Applications
                    </th>

                   
                    <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    Profile
                    </th>

                    
                    <th className="px-6 py-4 text-left font-semibold text-slate-700">
                    Action
                    </th>

                </tr>

                </thead>


            <tbody>

              {filteredUsers.map(
                (user) => (

            
                  <tr
                    key={user._id}
                    className="
                        hover:bg-slate-50
                        transition
                        border-b
                        border-slate-100
                    "
                    >
                  

                    <td className="px-6 py-4">
                        <div className="font-medium">
                            {user.name || "-"}
                        </div>
                    </td>

                     <td className="px-6 py-4">
                        <div className="font-medium">
                            {user.mobile || "-"}
                        </div>
                    </td>

                    <td className="px-6 py-4">
                        <div className="font-medium">
                            {user.state || "-"}
                        </div>
                    </td>

                     <td className="px-6 py-4">
                        <div className="font-medium">
                            {user.district || "-"}
                        </div>
                    </td>

                    <td className="px-6 py-4 text-center">

                        <span className="
                            bg-slate-100
                            text-slate-700
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                        ">
                            {user.applicationsCount}
                        </span>

                        </td>

                  

                    <td className="px-6 py-4 text-center">
                       
                        {user.profile_completed ? (

                        <span className="
                            bg-green-100
                            text-green-700
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                        ">
                            Complete
                        </span>

                        ) : (

                        <span className="
                            bg-red-100
                            text-red-700
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                        ">
                            Incomplete
                        </span>

                        )}
                    </td>

                    <td>

                     
                        <button
                            onClick={() =>
                                navigate(`/admin/users/${user._id}`)
                            }
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                text-sm
                                font-medium
                                transition
                            "
                            >
                            View
                            </button>
                       

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>
          </div>

        </div>

      </div>
    );
  };

export default
  AdminUsersPage;