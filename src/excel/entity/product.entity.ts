import { Column, Double, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    unit: string;
    @Column({ type: 'real' })  
    quantity: number;
    @Column()
    price: number;
  
}