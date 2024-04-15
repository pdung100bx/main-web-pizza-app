'use client';
import UseProfile from "../../../../components/UseProfile"
import UserTabs from "../../../../components/layout/UserTabs"
import { useEffect, useState } from "react";
import EditableImage from "../../../../components/layout/EditableImage";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "../../../../components/icons/Left"
import {redirect, useParams} from "next/navigation";
import MenuItemForm from "../../../../components/layout/MenuItemForm"
import DeleteButton from "../../../../components/DeleteButton"



export default function EditMenuItemPage(){

    const {id} = useParams();
    
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data}= UseProfile();    

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            })
        })
    },[])
    

    async function handleFormSubmit(ev,data) {
        ev.preventDefault();
        data = {...data,_id:id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const respone = await fetch('/api/menu-items', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
            if(respone.ok)
                resolve();
            else
                reject();
        })
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Saved',
            error: 'Error',
        })
        setRedirectToItems(true);
    }

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
          const res = await fetch('/api/menu-items?_id='+id, {
            method: 'DELETE',
          });
          if (res.ok)
            resolve();
          else
            reject();
        });
    
        await toast.promise(promise, {
          loading: 'Deleting...',
          success: 'Deleted',
          error: 'Error',
        });
    
        setRedirectToItems(true);
      }

    if(redirectToItems){
        return redirect('/menu-items');
    }

    if(loading){
        return 'Loading user info...';
    }

    if(!data.admin){
        return 'Not an admin.';
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
            <div className="max-w-md mx-auto mt-4">
                <div className="max-w-xs ml-auto pl-4">
                    <DeleteButton 
                        label="Delete this menu item" 
                        onDelete={handleDeleteClick} />
                </div>
            </div>
        </section>
    )
}