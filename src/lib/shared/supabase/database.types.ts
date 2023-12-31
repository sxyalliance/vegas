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
					status: Database['public']['Enums']['activity_status'];
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
					proposer_id: string;
					related_personnel: number;
					slug: string;
					status?: Database['public']['Enums']['activity_status'];
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
					status?: Database['public']['Enums']['activity_status'];
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
						referencedRelation: 'profiles';
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
					avatar_url: string;
					email: string;
					id: string;
					nickname: string;
				};
				Insert: {
					avatar_url: string;
					email: string;
					id: string;
					nickname: string;
				};
				Update: {
					avatar_url?: string;
					email?: string;
					id?: string;
					nickname?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
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
			activity_status: 'upcoming' | 'finished' | 'ongoing';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
