import CustomerLayout from "@/Layouts/CustomerLayout";

export default function Welcome({ auth: { user }, message }) {


    return <CustomerLayout user={user} message={message}  >

    </CustomerLayout>


}
