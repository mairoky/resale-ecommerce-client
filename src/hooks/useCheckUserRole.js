import { useEffect, useState } from 'react';

const useCheckUserRole = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isBuyer, setIsBuyer] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        fetch(`https://resale-ecommerce-server.vercel.app/users/${email}`)
            .then(res => res.json())
            .then(data => {
                // console.log('Check User Role', data);
                if (data.role === 'buyer') {
                    setIsBuyer(true);
                    return;
                }
                if (data.role === 'seller') {
                    setIsSeller(true);
                    return;
                }
                if (data.role === 'admin') {
                    setIsAdmin(true);
                    return;
                }
                setUserLoading(false);
            })
    }, [email]);

    return [isAdmin, isBuyer, isSeller, userLoading];
};

export default useCheckUserRole;