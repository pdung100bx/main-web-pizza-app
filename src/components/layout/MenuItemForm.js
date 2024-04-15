import { useEffect, useState } from "react";
import EditableImage from "../layout/EditableImage";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import MenuIteamPriceProps from "../layout/MenuItemPriceProps";

export default function MenuItemForm({onSubmit, menuItem}){

    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);
    const [extraIngredientPrices, setExtraIngrediantsPrices] = useState(menuItem?.extraIngredientPrices || []);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            })
    })
    },[])



    return(
        <form 
        onSubmit={ev => 
            onSubmit(ev,{ 
                image, name, description, basePrice,sizes,extraIngredientPrices,category 
            })} 
        className="mt-8 max-w-2xl mx-auto">
                <div className="grid items-start gap-4"
                style={{gridTemplateColumns:'.3fr .7fr'}} >
                    <div>
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label>Menu item name</label>
                        <input type="text" 
                        value={name} onChange={ev => setName(ev.target.value)} />
                        <label>Description</label>
                        <input type="text" 
                        value={description} onChange={ev => setDescription(ev.target.value)}/>
                        <label>Category</label>
                        <select value={category} onChange={ev => setCategory(ev.target.value)}>
                            {categories?.length > 0 && categories.map(c=> 
                            <option 
                            value={c._id}>{c.name}
                            </option>)}
                        </select>
                        <label>Base price</label>
                        <input type="text" 
                        value={basePrice} onChange={ev => setBasePrice(ev.target.value)}/>
                        <MenuIteamPriceProps name={'Sizes'} 
                                            addLable={'Add item size'}
                                             props={sizes} setProps={setSizes}/>
                        <MenuIteamPriceProps name={'Extra ingrediants'}
                                            addLable={'Add extra ingrediants'} 
                                            props={extraIngredientPrices} setProps={setExtraIngrediantsPrices} />
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
    );
}