create table questions (
    id bigint generated always as identity primary key,
    question text not null,
    reponse_a text not null,
    reponse_b text not null,
    reponse_c text not null,
    reponse_d text not null,
    bonne_reponse text not null,
    explication text,
    difficulte integer default 1,
    actif boolean default true,
    created_at timestamp with time zone default now()
);
