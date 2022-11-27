import { useEffect, useState } from 'react';

const useCheckUserRole = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isBuyer, setIsBuyer] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log('Check User Role', data);
                    if (data.role === 'seller') {
                        setIsSeller(true);
                    }
                    if (data.role === 'buyer') {
                        setIsBuyer(true);
                    }
                    if (data.role === 'admin') {
                        setIsAdmin(true);
                    }
                    setUserLoading(false);
                })
        }
    }, [email]);
    return [isAdmin, isBuyer, isSeller, userLoading];
};

export default useCheckUserRole;