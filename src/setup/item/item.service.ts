/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemRelation } from './entities/item-relation.entity';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {

  constructor(
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
    @InjectRepository(Item)
    private itemRelationRepo: Repository<ItemRelation>,
    private connection: Connection
  ) { }

  create(createItemDto: CreateItemDto) {
    delete createItemDto["id"];
    const model = this.itemRepo.create(createItemDto);
    const data = this.itemRepo.save(model);
    return data;
  }

  findAll() {
    const items = this.itemRepo.query("SELECT i.*, t.description 'typedesc', g.description 'groupdesc' FROM item i INNER JOIN `type` t ON (t.id = i.typeId) INNER JOIN `group` g ON (g.id = i.groupId) WHERE i.status IN ('Active','Locked') AND IFNULL(i.typeId,'') != '' AND isMedicine = '0' ORDER BY category, description");
    return items;
  }

  findAllMedicalItems() {
    const items = this.itemRepo.query("SELECT i.*, t.description 'typedesc', g.description 'groupdesc' FROM item i INNER JOIN `type` t ON (t.id = i.typeId) INNER JOIN `group` g ON (g.id = i.groupId) WHERE i.status IN ('Active','Locked') AND isMedicine = '1' ORDER BY category, description");
    return items;
  }

  findAllItems() {
    const items = this.itemRepo.query("SELECT i.* FROM item i WHERE i.status IN ('Active','Locked') ORDER BY description");
    return items;
  }

  findCategory(_category: string) {
    const items = this.itemRepo.query("SELECT i.*, t.description 'typedesc', g.description 'groupdesc' FROM item i INNER JOIN `type` t ON (t.id = i.typeId) INNER JOIN `group` g ON (g.id = i.groupId) WHERE i.status IN ('Active','Locked') AND i.category = ? AND IFNULL(i.typeId,'') != '' AND isMedicine = '0' ORDER BY category, description", [ _category ]);
    return items;
  }

  findMedicalCategory(_category: string) {
    const items = this.itemRepo.query("SELECT i.*, t.description 'typedesc', g.description 'groupdesc' FROM item i INNER JOIN `type` t ON (t.id = i.typeId) INNER JOIN `group` g ON (g.id = i.groupId) WHERE i.status IN ('Active','Locked') AND i.category = ? AND typeId isMedicine = '1' ORDER BY category, description", [ _category ]);
    return items;
  }

  findAllNonInvty() {
    const items = this.itemRepo.query("SELECT i.* FROM item i WHERE i.status IN ('Active','Locked') AND IFNULL(i.typeId,'') = '' ORDER BY description");
    return items;
  }

  findCategoryNonInvty(_category: string) {
    const items = this.itemRepo.query("SELECT i.* FROM item i WHERE i.status IN ('Active','Locked') AND i.category = ? AND IFNULL(i.typeId,'') = '' ORDER BY description", [ _category ]);
    return items;
  }

  findCategoryType(_category: string, _type: string) {
    const items = this.itemRepo.query("SELECT i.*, inv.genericId, inv.generic, t.description 'typedesc', g.description 'groupdesc', IFNULL(inv.onhandQty, 0) 'quantity' FROM item i INNER JOIN `type` t ON (t.id = i.typeId) INNER JOIN `group` g ON (g.id = i.groupId) LEFT JOIN inventory_report_view inv ON (inv.id = i.id) WHERE i.status IN ('Active','Locked') AND i.category = ? AND i.typeId = ? ORDER BY description", [ _category, _type ]);
    return items;
  }

  findCategoryTypeByDepartment(_category: string, _type: string, _deptId: string) {
    const items = this.itemRepo.query("SELECT i.*, inv.genericId, inv.generic, t.description 'typedesc', g.description 'groupdesc', IFNULL(inv.onhandQty, 0) 'quantity' FROM item i INNER JOIN `type` t ON (t.id = i.typeId) INNER JOIN `group` g ON (g.id = i.groupId) LEFT JOIN inventory_report_department_view inv ON (inv.id = i.id) WHERE i.status IN ('Active','Locked') AND i.category = ? AND i.typeId = ? AND inv.departmentId = ? ORDER BY description", [ _category, _type, _deptId ]);
    return items;
  }

  findCategoryTypeAll(_category: string) {
    const items = this.itemRepo.query("SELECT i.*, inv.genericId, inv.generic, t.description 'typedesc', g.description 'groupdesc', IFNULL(inv.onhandQty, 0) 'quantity' FROM item i INNER JOIN `type` t ON (t.id = i.typeId) INNER JOIN `group` g ON (g.id = i.groupId) LEFT JOIN inventory_report_view inv ON (inv.id = i.id) WHERE i.status IN ('Active','Locked') AND i.category = ? ORDER BY description", [ _category ]);
    return items;
  }

  findCategoryTypeAllByDepartment(_category: string, _deptId: string) {
    const items = this.itemRepo.query("SELECT i.*, inv.genericId, inv.generic, t.description 'typedesc', g.description 'groupdesc', IFNULL(inv.onhandQty, 0) 'quantity' FROM item i INNER JOIN `type` t ON (t.id = i.typeId) INNER JOIN `group` g ON (g.id = i.groupId) LEFT JOIN inventory_report_department_view inv ON (inv.id = i.id) WHERE i.status IN ('Active','Locked') AND i.category = ? AND inv.departmentId = ? ORDER BY description", [ _category, _deptId ]);
    return items;
  }

  async findItemRelation(_category: string, _id: string) {
    // if (_category == "Generic") {
    //   return this.itemRelationRepo.find({ genericId: _id });
    // } else if (_category == 'Non-Generic') {
    //   return this.itemRelationRepo.find({ nonGenericId: _id });
    // }
    const ir = await this.connection
    .getRepository(ItemRelation)
    .createQueryBuilder("ir")
    .where(_category == "Generic" ? "ir.genericId = :id": "ir.nonGenericId = :id", { id: _id })
    .getOne();

    return ir;
  }

  async findOne(id: string): Promise<Item> {
    const items: Item[] = await this.itemRepo.query("SELECT i.*, t.description 'typedesc', g.description 'groupdesc' FROM item i INNER JOIN `type` t ON (t.id = i.typeId) INNER JOIN `group` g ON (g.id = i.groupId) WHERE i.status = ? AND i.id = ?", [ 'Active', id ]);
    return items[0];
  }

  async findItemByCode(_itemCode: string) {
    return this.itemRepo.find({ code: _itemCode });
  }

  // async getTransactionNo(_prefix: string) {
  //   const item = await createQueryBuilder("item")
  //   .select("CONCAT('" + _prefix + "', LPAD(COUNT(*)+1, 5, '0'))", "transactionNo")
  //   .where("code LIKE '" + _prefix + "%'")
  //   .getRawOne();

  //   return item;
  // }

  async getTransactionNo(_prefix: string): Promise<string> {
    const transNo = this.itemRepo.query("SELECT CONCAT('" + _prefix + "', LPAD(IFNULL((MAX(REPLACE(`code`,'" + _prefix + "','')) + 0),0)+1, 5, '0')) 'transactionNo' FROM item WHERE `code` LIKE '" + _prefix + "%'");
    return transNo;
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    const models = this.itemRepo.update(id, { ...updateItemDto });
    return models;
  }

  updateStatus(id: string, status: string) {
    return this.itemRepo.query("Update item set status=? where id=?", [ status, id ]);
  }

  async remove(_id: string) {
    let _item = await this.itemRepo.findOneOrFail({ id: _id });
    _item.status = "Inactive";
    await this.itemRepo.update(_id, _item);
    return this.findOne(_id);
  }
}
