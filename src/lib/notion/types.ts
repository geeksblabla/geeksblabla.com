interface NotionUser {
  object: "user";
  id: string;
  name?: string;
  avatar_url?: string | null;
  type: "person";
  person?: {
    email: string;
  };
}

interface NotionIcon {
  type: "emoji";
  emoji: string;
}

interface NotionParent {
  type: "database_id";
  database_id: string;
}

interface NotionProperty {
  id: string;
  type: string;
}

interface NotionUrlProperty extends NotionProperty {
  type: "url";
  url: string | null;
}

interface NotionRelationProperty extends NotionProperty {
  type: "relation";
  relation: unknown[];
  has_more: boolean;
}

interface NotionCreatedByProperty extends NotionProperty {
  type: "created_by";
  created_by: NotionUser;
}

interface NotionRollupProperty extends NotionProperty {
  type: "rollup";
  rollup: {
    type: "array";
    array: unknown[];
    function: string;
  };
}

interface NotionMultiSelectProperty extends NotionProperty {
  type: "multi_select";
  multi_select: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

interface NotionSelectProperty extends NotionProperty {
  type: "select";
  select: {
    id: string;
    name: string;
    color: string;
  } | null;
}

interface NotionFormulaProperty extends NotionProperty {
  type: "formula";
  formula: {
    type: "string";
    string: string | null;
  };
}

interface NotionPeopleProperty extends NotionProperty {
  type: "people";
  people: NotionUser[];
}

interface NotionDateProperty extends NotionProperty {
  type: "date";
  date: {
    start: string;
    end: string | null;
    time_zone: string | null;
  };
}

interface NotionRichTextProperty extends NotionProperty {
  type: "rich_text";
  rich_text: Array<{
    type: "text";
    text: {
      content: string;
      link: string | null;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: string | null;
  }>;
}

interface NotionTitleProperty extends NotionProperty {
  type: "title";
  title: Array<{
    type: "text";
    text: {
      content: string;
      link: string | null;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: string | null;
  }>;
}

export type NotionEpisodeProperty =
  | NotionUrlProperty
  | NotionRelationProperty
  | NotionCreatedByProperty
  | NotionRollupProperty
  | NotionMultiSelectProperty
  | NotionSelectProperty
  | NotionFormulaProperty
  | NotionPeopleProperty
  | NotionDateProperty
  | NotionRichTextProperty
  | NotionTitleProperty;

interface NotionPage {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;
  cover: null;
  icon: NotionIcon;
  parent: NotionParent;
  archived: boolean;
  in_trash: boolean;
  properties: {
    [key: string]: NotionEpisodeProperty;
  };
  url: string;
  public_url: string;
}

export interface NotionResponse {
  object: "list";
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
  type: "page_or_database";
  page_or_database: Record<string, never>;
  request_id: string;
}

export type NotionEpisodeStatus =
  | "scheduled"
  | "next up"
  | "backlog"
  | "done"
  | "archived";
export type NotionEpisodeCategory = "dev" | "ai" | "ama" | "career" | "mss";

export type NotionEpisodeProperties = {
  title: string;
  date: string;
  guests: string[];
  description: string;
  youtubeUrl: string;
  category: NotionEpisodeCategory;
  hosts: string[];
  assignedTo: string;
  status: NotionEpisodeStatus;
};

export type NotionNormalizedResponse = NotionEpisodeProperties[];
