import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = (await this.model.findOne(
      filterQuery,
      {},
      { lean: true },
    )) as TDocument;

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async findByIdAndUpdate(
    id: string,
    updateData: Partial<TDocument>,
  ): Promise<any> {
    const updatedDocument = await this.model.findByIdAndUpdate(id, updateData, {
      new: true,
      lean: true,
    });

    if (!updatedDocument) {
      this.logger.warn(`Document not found with id: ${id}`);
      throw new NotFoundException('Document not found.');
    }
    return updatedDocument;
  }
  async findByIdAndDelete(
    id: string,
  ): Promise<any> {
    const deletedDocument = await this.model.findByIdAndDelete(id, {
      new: true,
      lean: true,
    });

    if (!deletedDocument) {
      this.logger.warn(`Document not found with id: ${id}`);
      throw new NotFoundException('Document not found.');
    }
    return deletedDocument;
  }

  async findById(id: string): Promise<TDocument> {
    const document = await this.model.findById(id);

    if (!document) {
      this.logger.warn(`Document not found with id: ${id}`);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async deleteById(id: string): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).lean();

    if (!deletedDocument) {
      this.logger.warn(`Document not found with id: ${id}`);
      throw new NotFoundException('Document not found.');
    }
    return;
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
