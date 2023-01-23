const OrdersCoffeeButton = ({coffee, onSelect}) =>{
return(
    <button onClick = {() => {onSelect(coffee.id)}}>
        <aside>
            <img src={coffee.image} alt = {coffee.name} width="55px"/>
        </aside>
        <section>
            <b>{coffee.name}</b>
        </section>
    </button>
)
}
export default OrdersCoffeeButton;