import * as React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue , Tooltip } from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";


type UsersData = {
  username:string,
  email : string,
  phone : string,
  password: string,
  image : string | null
  
}

type ParentComponentProps = {
  usersArray : UsersData[] | null,
  handleDelete : (username : string)=> void
}

type DisplayedUserData = Omit <UsersData , 'password' | 'image' >


export default function CustomTable ({usersArray,handleDelete} : ParentComponentProps) {

  if (!usersArray){
    return ( <div>No users found</div>)
  }
  

  const [users,setUsers] = React.useState<DisplayedUserData[]>([])
  const navigate = useNavigate()

 


  React.useEffect(() => {
    
    // Filter users based on conditions
    setUsers(usersArray.map(({ image, password, ...rest }) => rest));
    console.log('users from table ', users);
  }, [usersArray, setUsers]);



  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);

  }, [page, users]);

  return (
    <Table 
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="username">Username</TableColumn>
        <TableColumn key="phone">Phone</TableColumn>
        <TableColumn key="email">Email</TableColumn>
        <TableColumn key="actions">""</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
           <TableRow key={item.username}>
           {(columnKey) => (
             <TableCell>
               {columnKey === 'actions' ? (
                 <div className="flex justify-evenly">
                   <Tooltip content="Edit user">
                     <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={()=>navigate(`edit/${item.username}`)}>
                       <FaEdit />
                     </span>
                   </Tooltip>
                   <Tooltip color="danger" content="Delete user">
                     <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={()=>{handleDelete(item.username)}}>
                       <FaTrash />
                     </span>
                   </Tooltip>
                 </div>
               ) : (
                 getKeyValue(item, columnKey)
               )}
             </TableCell>
           )}
         </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
