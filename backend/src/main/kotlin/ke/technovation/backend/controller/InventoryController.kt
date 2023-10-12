package ke.technovation.backend.controller

import ke.technovation.backend.model.Item
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin(origins = ["*"], maxAge = 3600)
@RestController
class InventoryController {
    var itemList: MutableList<Item> = ArrayList()

    @PostMapping("/")
    fun saveInventoryItem(@RequestBody item: Item): Item {
        println("item = $item")
        itemList.add(item)
        showDb()
        return item
    }

    @GetMapping("/{itemName}")
    fun getInventoryItem(@PathVariable itemName: String): Item? {
        println("itemName = $itemName")
        for (item in itemList) {
            if (Objects.equals(item.name, itemName)) {
                showDb()
                return item
            }
        }
        showDb()
        return null
    }

    @GetMapping("/")
    fun getInventoryItems(): MutableList<Item> {
        println("InventoryController.getInventoryItems")
        showDb()
        return itemList
    }

    @PutMapping("/")
    fun updateInventoryItem(@RequestBody item: Item): Item? {
        println("item = $item")
        for (i in itemList.indices) {
            val listItem = itemList[i]
            if (Objects.equals(listItem.name, item.name)) {
                itemList[i] = item
                showDb()
                return item
            }
        }
        showDb()
        return null
    }

    @DeleteMapping("/{itemName}")
    fun deleteInventoryItem(@PathVariable itemName: String): Item? {
        println("itemName = $itemName")
        for (i in itemList.indices) {
            val listItem = itemList[i]
            if (Objects.equals(listItem.name, itemName)) {
                itemList.removeAt(i)
                showDb()
                return listItem
            }
        }
        showDb()
        return null
    }

    fun showDb() {
        println("itemList = $itemList")
    }
}
