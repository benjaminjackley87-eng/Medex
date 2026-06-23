const fs = require('fs');
const path = require('path');

const jsonDir = path.join(__dirname, '..', 'data', 'applied_anatomy');

const replacements = {
  struc_lungs_alveoli_01: 'struc_bronchial_tree_01',
  struc_lungs_capillaries_01: 'struc_bronchial_tree_01',
  struc_pediatric_airway_01: 'struc_larynx_01',
  struc_kidney_nephron_01: 'struc_kidneys_nephrons_01',
  struc_kidney_jga_01: 'struc_kidneys_nephrons_01',
  struc_kidney_vasculature_01: 'struc_kidneys_nephrons_01',
  struc_juxtaglomerular_apparatus_01: 'struc_kidneys_nephrons_01',
  struc_nephron_histology_01: 'struc_kidneys_nephrons_01',
  phys_acidbase_01: 'phys_renal_01',
  pharm_diuretics_01: 'phys_renal_01',
  struc_pns_autonomics_01: 'anat_pns_01',
  struc_pain_modulation_01: 'anat_pain_01',
  struc_pain_synapses_01: 'anat_pain_01',
  pharm_catecholamines: 'phys_endocrine_01',
  struc_cardiac_chambers_01: 'anat_cvs_01',
  struc_brainstem_nuclei_01: 'anat_cns_01',
  struc_capillary_bed_01: 'anat_cvs_01',
  struc_thyroid_gland_01: 'anat_endocrine_01',
  struc_parathyroid_chief_cells_01: 'anat_endocrine_01',
  struc_skin_strata_01: 'anat_endocrine_01',
  struc_hepatic_vascular_system_01: 'anat_hepatic_01',
  struc_hepatic_microanatomy_01: 'anat_hepatic_01',
  struc_hepatic_sinusoids_01: 'anat_hepatic_01',
  struc_nmj_anatomy_01: 'anat_musculoskeletal_01',
  struc_bone_histology_01: 'anat_musculoskeletal_01',
  struc_cavernous_sinus_01: 'anat_cns_01',
  struc_cns_ventricles_01: 'anat_cns_01',
  path_negative_pressure_edema: 'phys_resp_01'
};

try {
  const files = fs.readdirSync(jsonDir);
  let totalReplaced = 0;

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    if (file === 'graph_index.json') continue;

    const filePath = path.join(jsonDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [search, replace] of Object.entries(replacements)) {
      if (content.includes(search)) {
        // Simple regex with global replacement
        const regex = new RegExp(search, 'g');
        content = content.replace(regex, replace);
        modified = true;
        totalReplaced++;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated references in: ${file}`);
    }
  }

  console.log(
    `\nSuccessfully updated ${totalReplaced} reference mismatched IDs across database files.`
  );
} catch (error) {
  console.error('Failed to fix references:', error);
}
