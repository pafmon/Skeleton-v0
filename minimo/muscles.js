// Comprehensive Muscle Database
// Compiled from TeachMeAnatomy.info and anatomical references
// For use in educational anatomy applications

export const muscleDatabase = {
  // UPPER LIMB MUSCLES

  // Shoulder Girdle Muscles
  'trapezius': {
    name: 'Musculus trapezius',
    origin: ['Protuberantia occipitalis externa', 'Ligamentum nuchae', 'Processus spinosi vertebrarum cervicalium et thoracicalium (C7-T12)'],
    insertion: ['Pars lateralis claviculae', 'Acromion', 'Spina scapulae'],
    action: ['Elevatio scapulae', 'Retractio scapulae', 'Depressio scapulae', 'Rotatio scapulae'],
    innervation: ['Nervus accessorius (CN XI)', 'Rami ventrales nervorum cervicalium (C3-C4)']
  },

  'levator_scapulae': {
    name: 'Musculus levator scapulae',
    origin: ['Processus transversi vertebrarum cervicalium (C1-C4)'],
    insertion: ['Angulus superior scapulae'],
    action: ['Elevatio scapulae', 'Rotatio scapulae'],
    innervation: 'Rami ventrales nervorum cervicalium (C3-C4), Nervus dorsalis scapulae (C5)'
  },

  'rhomboideus_major': {
    name: 'Musculus rhomboideus major',
    origin: ['Processus spinosi vertebrarum thoracicalium (T2-T5)'],
    insertion: ['Margo medialis scapulae'],
    action: ['Retractio scapulae', 'Rotatio scapulae', 'Elevatio scapulae'],
    innervation: 'Nervus dorsalis scapulae (C4-C5)'
  },

  'rhomboideus_minor': {
    name: 'Musculus rhomboideus minor',
    origin: ['Processus spinosi vertebrarum cervicalium (C7) et thoracicalium (T1)'],
    insertion: ['Margo medialis scapulae (angulus superior)'],
    action: ['Retractio scapulae', 'Rotatio scapulae', 'Elevatio scapulae'],
    innervation: 'Nervus dorsalis scapulae (C4-C5)'
  },

  'serratus_anterior': {
    name: 'Musculus serratus anterior',
    origin: ['Facies lateralis costarum (1-8/9)'],
    insertion: ['Angulus inferior scapulae', 'Margo medialis scapulae'],
    action: ['Protractio scapulae', 'Rotatio scapulae', 'Stabilisatio scapulae'],
    innervation: 'Nervus thoracicus longus (C5-C7)'
  },

  'pectoralis_minor': {
    name: 'Musculus pectoralis minor',
    origin: ['Costae (3-5)', 'Processus xiphoideus'],
    insertion: ['Processus coracoideus scapulae'],
    action: ['Depressio scapulae', 'Protractio scapulae', 'Rotatio scapulae'],
    innervation: 'Nervi pectorales mediales (C8-T1)'
  },

  'subclavius': {
    name: 'Musculus subclavius',
    origin: ['Costa prima'],
    insertion: ['Clavicula (facies inferior)'],
    action: ['Depressio claviculae', 'Stabilisatio articulationis sternoclavicularis'],
    innervation: 'Nervus subclavius (C5-C6)'
  },

  'omohyoideus_venter_superior': {
    name: 'Musculus omohyoideus (venter superior)',
    origin: ['Scapula (incisura scapulae)'],
    insertion: ['Os hyoideum'],
    action: ['Depressio ossis hyoidei', 'Tensio fasciae cervicalis'],
    innervation: 'Ansa cervicalis (C1-C3)'
  },

  // Rotator Cuff and Upper Arm Muscles
  'deltoid': {
    name: 'Musculus deltoideus',
    origin: ['Clavicula (pars lateralis)', 'Acromion', 'Spina scapulae'],
    insertion: ['Tuberositas deltoidea humeri'],
    action: ['Abductio brachii', 'Flexio brachii', 'Extensio brachii', 'Rotatio medialis brachii', 'Rotatio lateralis brachii'],
    innervation: 'Nervus axillaris (C5-C6)'
  },

  'supraspinatus': {
    name: 'Musculus supraspinatus',
    origin: ['Fossa supraspinata scapulae'],
    insertion: ['Tuberculum majus humeri'],
    action: ['Abductio brachii', 'Stabilisatio articulationis glenohumeralis'],
    innervation: 'Nervus suprascapularis (C5-C6)'
  },

  'infraspinatus': {
    name: 'Musculus infraspinatus',
    origin: ['Fossa infraspinata scapulae'],
    insertion: ['Tuberculum majus humeri'],
    action: ['Rotatio lateralis brachii', 'Adductio brachii', 'Stabilisatio articulationis glenohumeralis'],
    innervation: 'Nervus suprascapularis (C5-C6)'
  },

  'teres_minor': {
    name: 'Musculus teres minor',
    origin: ['Margo lateralis scapulae'],
    insertion: ['Tuberculum majus humeri'],
    action: ['Rotatio lateralis brachii', 'Adductio brachii', 'Stabilisatio articulationis glenohumeralis'],
    innervation: 'Nervus axillaris (C5-C6)'
  },

  'teres_major': {
    name: 'Musculus teres major',
    origin: ['Angulus inferior scapulae'],
    insertion: ['Sulcus intertubercularis humeri'],
    action: ['Rotatio medialis brachii', 'Adductio brachii', 'Extensio brachii'],
    innervation: 'Nervus subscapularis inferior (C5-C7)'
  },

  'subscapularis': {
    name: 'Musculus subscapularis',
    origin: ['Fossa subscapularis scapulae'],
    insertion: ['Tuberculum minus humeri'],
    action: ['Rotatio medialis brachii', 'Stabilisatio articulationis glenohumeralis'],
    innervation: 'Nervi subscapulares (C5-C7)'
  },

  'biceps_brachii': {
    name: 'Musculus biceps brachii',
    origin: ['Caput longum: Tuberculum supraglenoidale scapulae', 'Caput breve: Processus coracoideus scapulae'],
    insertion: ['Tuberositas radii'],
    action: ['Flexio cubiti', 'Supinatio antebrachii', 'Flexio brachii (caput longum)'],
    innervation: 'Nervus musculocutaneus (C5-C6)'
  },

  'coracobrachialis': {
    name: 'Musculus coracobrachialis',
    origin: ['Processus coracoideus scapulae'],
    insertion: ['Corpus humeri (facies medialis)'],
    action: ['Flexio brachii', 'Adductio brachii'],
    innervation: 'Nervus musculocutaneus (C5-C7)'
  },

  'brachialis': {
    name: 'Musculus brachialis',
    origin: ['Corpus humeri (facies anterior)'],
    insertion: ['Processus coronoideus ulnae'],
    action: ['Flexio cubiti'],
    innervation: ['Nervus musculocutaneus (C5-C6)', 'Nervus radialis (C7)']
  },

  'triceps_brachii': {
    name: 'Musculus triceps brachii',
    origin: ['Caput longum: Tuberculum infraglenoidale scapulae', 'Caput laterale: Corpus humeri (facies posterior)', 'Caput mediale: Corpus humeri (facies posterior)'],
    insertion: ['Olecranon ulnae'],
    action: ['Extensio cubiti', 'Extensio brachii et adductio brachii (caput longum)'],
    innervation: 'Nervus radialis (C6-C8)'
  },

  'anconeus': {
    name: 'Musculus anconeus',
    origin: ['Epicondylus lateralis humeri'],
    insertion: ['Olecranon ulnae', 'Facies posterior ulnae'],
    action: ['Extensio cubiti'],
    innervation: 'Nervus radialis (C7-C8)'
  },

  'brachioradialis': {
    name: 'Musculus brachioradialis',
    origin: ['Crista supracondylaris lateralis humeri'],
    insertion: ['Processus styloideus radii'],
    action: ['Flexio cubiti', 'Pronatio et supinatio antebrachii'],
    innervation: 'Nervus radialis (C5-C6)'
  },

  // Forearm Flexor Muscles
  'pronator_teres': {
    name: 'Musculus pronator teres',
    origin: ['Caput humerale: Epicondylus medialis humeri', 'Caput ulnare: Processus coronoideus ulnae'],
    insertion: ['Facies lateralis radii (pars media)'],
    action: ['Pronatio antebrachii', 'Flexio cubiti (caput humerale)'],
    innervation: 'Nervus medianus (C6-C7)'
  },

  'flexor_carpi_radialis': {
    name: 'Musculus flexor carpi radialis',
    origin: ['Epicondylus medialis humeri'],
    insertion: ['Basis ossis metacarpalis II'],
    action: ['Flexio manus', 'Abductio manus'],
    innervation: 'Nervus medianus (C6-C7)'
  },

  'palmaris_longus': {
    name: 'Musculus palmaris longus',
    origin: ['Epicondylus medialis humeri'],
    insertion: ['Aponeurosis palmaris'],
    action: ['Flexio manus', 'Tensio aponeurosis palmaris'],
    innervation: 'Nervus medianus (C7-C8)'
  },

  'flexor_carpi_ulnaris': {
    name: 'Musculus flexor carpi ulnaris',
    origin: ['Caput humerale: Epicondylus medialis humeri', 'Caput ulnare: Olecranon et facies posterior ulnae'],
    insertion: ['Os pisiforme', 'Hamulus ossis hamati', 'Basis ossis metacarpalis V'],
    action: ['Flexio manus', 'Adductio manus'],
    innervation: 'Nervus ulnaris (C7-C8, T1)'
  },

  'flexor_digitorum_superficialis': {
    name: 'Musculus flexor digitorum superficialis',
    origin: ['Caput humeroulnare: Epicondylus medialis humeri, Processus coronoideus ulnae', 'Caput radiale: Facies anterior radii'],
    insertion: ['Phalanges mediae digitorum II-V'],
    action: ['Flexio digitorum II-V (phalanges mediae)', 'Flexio manus'],
    innervation: 'Nervus medianus (C7-C8, T1)'
  },

  'flexor_digitorum_profundus': {
    name: 'Musculus flexor digitorum profundus',
    origin: ['Facies anterior ulnae', 'Membrana interossea antebrachii'],
    insertion: ['Phalanges distales digitorum II-V'],
    action: ['Flexio digitorum II-V (phalanges distales)'],
    innervation: ['Nervus medianus (C8-T1)', 'Nervus ulnaris (C8-T1)']
  },

  'flexor_pollicis_longus': {
    name: 'Musculus flexor pollicis longus',
    origin: ['Facies anterior radii', 'Membrana interossea antebrachii'],
    insertion: ['Phalanx distalis pollicis'],
    action: ['Flexio pollicis'],
    innervation: 'Nervus medianus (C7-C8)'
  },

  'pronator_quadrates': {
    name: 'Musculus pronator quadratus',
    origin: ['Facies anterior ulnae (pars distalis)'],
    insertion: ['Facies anterior radii (pars distalis)'],
    action: ['Pronatio antebrachii'],
    innervation: 'Nervus medianus (C7-C8)'
  },

  // Forearm Extensor Muscles
  'extensor_carpi_radialis_longus': {
    name: 'Musculus extensor carpi radialis longus',
    origin: ['Crista supracondylaris lateralis humeri'],
    insertion: ['Basis ossis metacarpalis II'],
    action: ['Extensio manus', 'Abductio manus'],
    innervation: 'Nervus radialis (C6-C7)'
  },

  'extensor_carpi_radialis_brevis': {
    name: 'Musculus extensor carpi radialis brevis',
    origin: ['Epicondylus lateralis humeri'],
    insertion: ['Basis ossis metacarpalis III'],
    action: ['Extensio manus', 'Abductio manus'],
    innervation: 'Nervus radialis (C7-C8)'
  },

  'extensor_digitorum': {
    name: 'Musculus extensor digitorum',
    origin: ['Epicondylus lateralis humeri'],
    insertion: ['Aponeurosis dorsalis digitorum II-V'],
    action: ['Extensio digitorum II-V', 'Extensio manus'],
    innervation: 'Nervus radialis (C7-C8)'
  },

  'extensor_digiti_minimi': {
    name: 'Musculus extensor digiti minimi',
    origin: ['Epicondylus lateralis humeri'],
    insertion: ['Aponeurosis dorsalis digiti V'],
    action: ['Extensio digiti V'],
    innervation: 'Nervus radialis (C7-C8)'
  },

  'extensor_carpi_ulnaris': {
    name: 'Musculus extensor carpi ulnaris',
    origin: ['Epicondylus lateralis humeri', 'Facies posterior ulnae'],
    insertion: ['Basis ossis metacarpalis V'],
    action: ['Extensio manus', 'Adductio manus'],
    innervation: 'Nervus radialis (C7-C8)'
  },

  'supinator': {
    name: 'Musculus supinator',
    origin: ['Epicondylus lateralis humeri', 'Crista musculi supinatoris ulnae'],
    insertion: ['Facies lateralis radii (pars proximalis)'],
    action: ['Supinatio antebrachii'],
    innervation: 'Nervus radialis (C5-C6)'
  },

  'extensor_indicis': {
    name: 'Musculus extensor indicis',
    origin: ['Facies posterior ulnae', 'Membrana interossea antebrachii'],
    insertion: ['Aponeurosis dorsalis digiti II'],
    action: ['Extensio digiti II'],
    innervation: 'Nervus radialis (C7-C8)'
  },

  'extensor_pollicis_longus': {
    name: 'Musculus extensor pollicis longus',
    origin: ['Facies posterior ulnae', 'Membrana interossea antebrachii'],
    insertion: ['Phalanx distalis pollicis'],
    action: ['Extensio pollicis'],
    innervation: 'Nervus radialis (C7-C8)'
  },

  'extensor_pollicis_brevis': {
    name: 'Musculus extensor pollicis brevis',
    origin: ['Facies posterior radii', 'Membrana interossea antebrachii'],
    insertion: ['Phalanx proximalis pollicis'],
    action: ['Extensio pollicis'],
    innervation: 'Nervus radialis (C7-C8)'
  },

  'abductor_pollicis_longus': {
    name: 'Musculus abductor pollicis longus',
    origin: ['Facies posterior radii et ulnae', 'Membrana interossea antebrachii'],
    insertion: ['Basis ossis metacarpalis I'],
    action: ['Abductio pollicis', 'Extensio pollicis'],
    innervation: 'Nervus radialis (C7-C8)'
  },

  // Hand Muscles - Thenar Eminence
  'abductor_pollicis_brevis': {
    name: 'Musculus abductor pollicis brevis',
    origin: ['Os scaphoideum', 'Retinaculum musculorum flexorum'],
    insertion: ['Phalanx proximalis pollicis (basis)'],
    action: ['Abductio pollicis'],
    innervation: 'Nervus medianus (C8-T1)'
  },

  'flexor_pollicis_brevis': {
    name: 'Musculus flexor pollicis brevis',
    origin: ['Caput superficiale: Retinaculum musculorum flexorum', 'Caput profundum: Os trapezium, Os trapezoideum, Os capitatum'],
    insertion: ['Phalanx proximalis pollicis (basis)'],
    action: ['Flexio pollicis'],
    innervation: ['Nervus medianus (C8-T1)', 'Nervus ulnaris (C8-T1)']
  },

  'opponens_pollicis': {
    name: 'Musculus opponens pollicis',
    origin: ['Os trapezium', 'Retinaculum musculorum flexorum'],
    insertion: ['Os metacarpale I'],
    action: ['Oppositio pollicis'],
    innervation: 'Nervus medianus (C8-T1)'
  },

  'adductor_pollicis': {
    name: 'Musculus adductor pollicis',
    origin: ['Caput obliquum: Os capitatum, Basis ossis metacarpalis III', 'Caput transversum: Facies palmaris ossis metacarpalis III'],
    insertion: ['Phalanx proximalis pollicis (basis ulnaris)'],
    action: ['Adductio pollicis'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  // Hand Muscles - Hypothenar Eminence
  'abductor_digiti_minimi': {
    name: 'Musculus abductor digiti minimi',
    origin: ['Os pisiforme', 'Retinaculum musculorum flexorum'],
    insertion: ['Phalanx proximalis digiti V (basis)'],
    action: ['Abductio digiti V'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  'flexor_digiti_minimi_brevis': {
    name: 'Musculus flexor digiti minimi brevis',
    origin: ['Hamulus ossis hamati', 'Retinaculum musculorum flexorum'],
    insertion: ['Phalanx proximalis digiti V (basis)'],
    action: ['Flexio digiti V'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  'opponens_digiti_minimi': {
    name: 'Musculus opponens digiti minimi',
    origin: ['Hamulus ossis hamati', 'Retinaculum musculorum flexorum'],
    insertion: ['Os metacarpale V'],
    action: ['Oppositio digiti V'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  // Hand Muscles - Interossei Dorsales
  'interosseus_dorsalis_i': {
    name: 'Musculus interosseus dorsalis I',
    origin: ['Facies lateralis ossis metacarpalis I', 'Facies medialis ossis metacarpalis II'],
    insertion: ['Phalanx proximalis digiti II (basis)', 'Aponeurosis dorsalis'],
    action: ['Abductio digiti II', 'Flexio phalangis proximalis digiti II'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  'interosseus_dorsalis_ii': {
    name: 'Musculus interosseus dorsalis II',
    origin: ['Facies lateralis ossis metacarpalis II', 'Facies medialis ossis metacarpalis III'],
    insertion: ['Phalanx proximalis digiti III (basis)', 'Aponeurosis dorsalis'],
    action: ['Abductio digiti III', 'Flexio phalangis proximalis digiti III'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  'interosseus_dorsalis_iii': {
    name: 'Musculus interosseus dorsalis III',
    origin: ['Facies lateralis ossis metacarpalis III', 'Facies medialis ossis metacarpalis IV'],
    insertion: ['Phalanx proximalis digiti IV (basis)', 'Aponeurosis dorsalis'],
    action: ['Abductio digiti IV', 'Flexio phalangis proximalis digiti IV'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  'interosseus_dorsalis_iv': {
    name: 'Musculus interosseus dorsalis IV',
    origin: ['Facies lateralis ossis metacarpalis IV', 'Facies medialis ossis metacarpalis V'],
    insertion: ['Phalanx proximalis digiti V (basis)', 'Aponeurosis dorsalis'],
    action: ['Abductio digiti V', 'Flexio phalangis proximalis digiti V'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  // Hand Muscles - Interossei Palmares
  'interosseus_palmaris_i': {
    name: 'Musculus interosseus palmaris I',
    origin: ['Facies medialis ossis metacarpalis II'],
    insertion: ['Phalanx proximalis digiti II (basis)', 'Aponeurosis dorsalis'],
    action: ['Adductio digiti II', 'Flexio phalangis proximalis digiti II'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  'interosseus_palmaris_ii': {
    name: 'Musculus interosseus palmaris II',
    origin: ['Facies lateralis ossis metacarpalis IV'],
    insertion: ['Phalanx proximalis digiti IV (basis)', 'Aponeurosis dorsalis'],
    action: ['Adductio digiti IV', 'Flexio phalangis proximalis digiti IV'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  'interosseus_palmaris_iii': {
    name: 'Musculus interosseus palmaris III',
    origin: ['Facies lateralis ossis metacarpalis V'],
    insertion: ['Phalanx proximalis digiti V (basis)', 'Aponeurosis dorsalis'],
    action: ['Adductio digiti V', 'Flexio phalangis proximalis digiti V'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  // Hand Muscles - Lumbricals
  'lumbricalis_i': {
    name: 'Musculus lumbricalis I',
    origin: ['Tendines musculi flexoris digitorum profundus (digitus II)'],
    insertion: ['Aponeurosis dorsalis digiti II'],
    action: ['Flexio phalangis proximalis digiti II', 'Extensio phalangum mediarum et distalium digiti II'],
    innervation: 'Nervus medianus (C8-T1)'
  },

  'lumbricalis_ii': {
    name: 'Musculus lumbricalis II',
    origin: ['Tendines musculi flexoris digitorum profundus (digitus III)'],
    insertion: ['Aponeurosis dorsalis digiti III'],
    action: ['Flexio phalangis proximalis digiti III', 'Extensio phalangum mediarum et distalium digiti III'],
    innervation: 'Nervus medianus (C8-T1)'
  },

  'lumbricalis_iii': {
    name: 'Musculus lumbricalis III',
    origin: ['Tendines musculi flexoris digitorum profundus (digitus IV)'],
    insertion: ['Aponeurosis dorsalis digiti IV'],
    action: ['Flexio phalangis proximalis digiti IV', 'Extensio phalangum mediarum et distalium digiti IV'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  'lumbricalis_iv': {
    name: 'Musculus lumbricalis IV',
    origin: ['Tendines musculi flexoris digitorum profundus (digitus V)'],
    insertion: ['Aponeurosis dorsalis digiti V'],
    action: ['Flexio phalangis proximalis digiti V', 'Extensio phalangum mediarum et distalium digiti V'],
    innervation: 'Nervus ulnaris (C8-T1)'
  },

  // LOWER LIMB MUSCLES

  // Gluteal Region
  'gluteus_maximus': {
    name: 'Gluteus Maximus',
    origin: ['area_ilium_posterior_gluteal_line', 'area_sacrum', 'area_coccyx'],
    insertion: ['area_femur_gluteal_tuberosity'],
    action: ['Extends hip', 'Laterally rotates thigh', 'Abducts thigh'],
    innervation: 'Inferior gluteal nerve (L5, S1, S2)'
  },

  'gluteus_medius': {
    name: 'Gluteus Medius',
    origin: ['area_ilium_outer_surface'],
    insertion: ['area_femur_greater_trochanter'],
    action: ['Abducts thigh', 'Medially rotates thigh', 'Stabilizes pelvis'],
    innervation: 'Superior gluteal nerve (L4, L5, S1)'
  },

  // Thigh Muscles
  'quadriceps_rectus_femoris': {
    name: 'Rectus Femoris',
    origin: ['area_ilium_anterior_inferior_iliac_spine'],
    insertion: ['area_patella'],
    action: ['Extends knee', 'Flexes hip'],
    innervation: 'Femoral nerve (L2, L3, L4)'
  },

  'quadriceps_vastus_lateralis': {
    name: 'Vastus Lateralis',
    origin: ['area_femur_greater_trochanter', 'area_femur_lateral_lip_linea_aspera'],
    insertion: ['area_patella'],
    action: ['Extends knee'],
    innervation: 'Femoral nerve (L2, L3, L4)'
  },

  'quadriceps_vastus_medialis': {
    name: 'Vastus Medialis',
    origin: ['area_femur_medial_lip_linea_aspera'],
    insertion: ['area_patella'],
    action: ['Extends knee'],
    innervation: 'Femoral nerve (L2, L3, L4)'
  },

  'hamstring_biceps_femoris': {
    name: 'Biceps Femoris',
    origin: ['area_ischial_tuberosity', 'area_femur_lateral_lip_linea_aspera'],
    insertion: ['area_fibula_head'],
    action: ['Flexes knee', 'Extends hip', 'Laterally rotates leg'],
    innervation: ['Tibial nerve (S1, S2)', 'Common peroneal nerve (L5, S1, S2)']
  },

  'hamstring_semitendinosus': {
    name: 'Semitendinosus',
    origin: ['area_ischial_tuberosity'],
    insertion: ['area_tibia_medial_surface'],
    action: ['Flexes knee', 'Extends hip', 'Medially rotates leg'],
    innervation: 'Tibial nerve (L5, S1, S2)'
  },

  // TRUNK MUSCLES

  'trapezius': {
    name: 'Trapezius',
    origin: ['area_occipital_bone', 'area_cervical_spinous_processes', 'area_thoracic_spinous_processes'],
    insertion: ['area_clavicle_lateral', 'area_acromion', 'area_scapula_spine'],
    action: ['Elevates scapula', 'Retracts scapula', 'Rotates scapula'],
    innervation: ['Accessory nerve (CN XI)', 'C3, C4 cervical nerves']
  },

  'latissimus_dorsi': {
    name: 'Latissimus Dorsi',
    origin: ['area_thoracic_spinous_processes', 'area_iliac_crest', 'area_ribs_inferior'],
    insertion: ['area_humerus_intertubercular_sulcus'],
    action: ['Extends arm', 'Adducts arm', 'Medially rotates arm'],
    innervation: 'Thoracodorsal nerve (C6, C7, C8)'
  }
};

// Helper function to get muscle by area
export function getMuscleByArea(areaName) {
  for (const [key, muscle] of Object.entries(muscleDatabase)) {
    if (muscle.origin.some(origin => origin.toLowerCase().includes(areaName.toLowerCase().replace('area_', ''))) ||
        muscle.insertion.some(insertion => insertion.toLowerCase().includes(areaName.toLowerCase().replace('area_', '')))) {
      return { key, ...muscle };
    }
  }
  return null;
}