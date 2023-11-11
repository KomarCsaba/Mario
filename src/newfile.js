import React, { useRef, useEffect, useState } from 'react';

const CollisionDetection = () => {
  const div1Ref = useRef(null); // egy referencia, amit egy div-hez rendelünk
  const div2Ref = useRef(null); // egy referencia, amit egy div-hez rendelünk
  const [isColliding, setIsColliding] = useState(false);
  //Ez a kód egy React state változót hoz létre isColliding néven, és egy hozzá tartozó állapotkezelő függvényt setIsColliding néven.
  //Ez a sor a React useState Hook-ot használja, ami azt jelenti, hogy egy állapotot hoz létre a funkcionális komponensben. A useState
  //egy tömböt ad vissza, ahol az első elem a jelenlegi állapot, a második pedig egy függvény, amellyel módosíthatjuk ezt az állapotot.
  /*
    -isColliding: Ez az állapot változó, amely tárolja, hogy a két <div> elem érintkezik-e vagy sem. 
        Az alapértelmezett értéke false, tehát kezdetben nem érintkeznek.
    -setIsColliding: Ez a függvény, amelyet hívva módosíthatjuk az isColliding állapotot. (false/true = hozzáér vagy nem)
        Amikor például az érintkezés megtörténik, meghívhatjuk setIsColliding(true)-t, és az állapot frissül, ami az új értéket 
        kiváltja a komponens újrarajzolásával együtt.
  */

  useEffect(() => {
    const handleCollision = () => {
      const rect1 = div1Ref.current.getBoundingClientRect();
      const rect2 = div2Ref.current.getBoundingClientRect();
      /*
        Ez a kód a getBoundingClientRect metódust használja a div1Ref referencián keresztül, hogy lekérje az első <div> (div1) 
        méreteit és pozícióját a böngésző ablakához képest.
        A getBoundingClientRect metódus visszaad egy DOMRect objektumot, amely az adott elem körül rajzolható legszűkebb 
        téglalapot reprezentálja. A DOMRect objektum tartalmazza az elem bal, felső, jobb és alsó széleit, valamint a 
        szélességét és a magasságát.
        A rect1 változó tehát tartalmazza a div1 elem jelenlegi pozícióját és méretét a képernyőn, és ezt az információt lehet használni 
        az érintkezés vizsgálatához vagy más pozícionálási számításokhoz a komponens logikájában.
      */

      // Érintkezés vizsgálata
      const collision = !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );

      setIsColliding(collision);
    };

    // Komponens mount-olásakor és a div-ek referenciái elérhetőek lesznek
    handleCollision();

    // Eseménykezelő regisztrálása a window resize és scroll eseményekre
    window.addEventListener('resize', handleCollision);
    window.addEventListener('scroll', handleCollision);

    // Eseménykezelők eltávolítása a komponens elszállásakor
    return () => {
      window.removeEventListener('resize', handleCollision);
      window.removeEventListener('scroll', handleCollision);
    };
  }, [div1Ref, div2Ref]);

  return (
    <div>
      <div
        ref={div1Ref}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'blue',
          margin: '20px',
        }}
      >
        Div 1
      </div>
      <div
        ref={div2Ref}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'red',
          margin: '20px',
        }}
      >
        Div 2
      </div>
      {isColliding ? <p>Divs are colliding!</p> : <p>No collision.</p>}
    </div>
  );
};

export default CollisionDetection;

