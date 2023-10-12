package ke.technovation.backend.model

class Item(val name: String, val amount: Int) {

    override fun toString(): String {
        return "Item [name=$name, amount=$amount]"
    }
}
