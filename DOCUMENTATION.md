# Randmeet

## Sommaire

- [Randmeet](#randmeet)
  - [Sommaire](#sommaire)
  - [Téléversement d'un fichier CSV](#téléversement-dun-fichier-csv)
  - [Téléchargement d'un fichier CSV](#téléchargement-dun-fichier-csv)

## Téléversement d'un fichier CSV

Pour téléverser un fichier CSV, appuyez sur le bouton `Upload` dans l'en-tête
du site et choisir un fichier `.csv` stocké sur votre ordinateur.

Le fichier CSV doit obligatoirement avoir ce format:

| Nom           | Status  |   Projet |
| :------------ | :-----: | -------: |
| Jean Dupont   | Manager | Projet A |
| Paul Dupont   |   PM    | Projet A |
| Marie Dupont  |         | Projet B |
| Claire Dupont |  DUOA   | Projet C |

**Attention: Les champs _Nom_ et _Projet_ sont obligatoires !**

Si vous ouvrez ce même fichier dans un éditeur de texte, il doit ressembler à
ceci:

```csv
Nom,Status,Projet
Jean Dupont,Manager,Projet A
Paul Dupont,PM,Projet A
Marie Dupont,,Projet B
Claire Dupont,DUOA,Projet B
```

## Téléchargement d'un fichier CSV

Pour télécharger le fichier qui a été généré, vous avez simplement à appuyer sur
le bouton `Download` dans l'en-tête.
