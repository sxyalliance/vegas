export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			event_categories: {
				Row: {
					color: string;
					icon: string;
					id: number;
					key: string;
					sort: number;
				};
				Insert: {
					color: string;
					icon: string;
					id?: number;
					key: string;
					sort?: number;
				};
				Update: {
					color?: string;
					icon?: string;
					id?: number;
					key?: string;
					sort?: number;
				};
				Relationships: [];
			};
			events: {
				Row: {
					category_key: string;
					description: string;
					event_point: string;
					id: number;
					inbound_time: string | null;
					inbound_transport: string | null;
					meeting_point: string;
					meeting_time: string;
					name: string;
					outbound_time: string | null;
					outbound_transport: string | null;
					proposer_id: string;
					related_personnel: number;
					slug: string;
				};
				Insert: {
					category_key: string;
					description: string;
					event_point: string;
					id?: number;
					inbound_time?: string | null;
					inbound_transport?: string | null;
					meeting_point: string;
					meeting_time: string;
					name: string;
					outbound_time?: string | null;
					outbound_transport?: string | null;
					proposer_id?: string;
					related_personnel: number;
					slug: string;
				};
				Update: {
					category_key?: string;
					description?: string;
					event_point?: string;
					id?: number;
					inbound_time?: string | null;
					inbound_transport?: string | null;
					meeting_point?: string;
					meeting_time?: string;
					name?: string;
					outbound_time?: string | null;
					outbound_transport?: string | null;
					proposer_id?: string;
					related_personnel?: number;
					slug?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'events_category_key_fkey';
						columns: ['category_key'];
						isOneToOne: false;
						referencedRelation: 'event_categories';
						referencedColumns: ['key'];
					},
					{
						foreignKeyName: 'events_proposer_id_fkey';
						columns: ['proposer_id'];
						isOneToOne: false;
						referencedRelation: 'members_view';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'events_proposer_id_fkey';
						columns: ['proposer_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			games: {
				Row: {
					created_at: string;
					description: string | null;
					formatted_price: number;
					id: number;
					image_url: string;
					name: string;
					on_sale: boolean;
					provider: number;
					provider_identifier: string;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					formatted_price: number;
					id?: number;
					image_url: string;
					name: string;
					on_sale?: boolean;
					provider: number;
					provider_identifier: string;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					formatted_price?: number;
					id?: number;
					image_url?: string;
					name?: string;
					on_sale?: boolean;
					provider?: number;
					provider_identifier?: string;
				};
				Relationships: [];
			};
			phrases: {
				Row: {
					defined_at: string;
					definition: string;
					id: number;
					phrase: string;
				};
				Insert: {
					defined_at?: string;
					definition: string;
					id?: number;
					phrase: string;
				};
				Update: {
					defined_at?: string;
					definition?: string;
					id?: number;
					phrase?: string;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					id: number;
					nickname: string;
					user_id: string;
				};
				Insert: {
					id?: number;
					nickname: string;
					user_id: string;
				};
				Update: {
					id?: number;
					nickname?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'members_view';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'profiles_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			members_view: {
				Row: {
					email: string | null;
					id: string | null;
					nickname: string | null;
				};
				Relationships: [];
			};
		};
		Functions: {
			get_random_phrases: {
				Args: Record<PropertyKey, never>;
				Returns: {
					defined_at: string;
					definition: string;
					id: number;
					phrase: string;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
