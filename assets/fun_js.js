///////////////////////////////////////////
// Chord Displayer
const keyboard_notes = ['note-c', 'note-c#', 'note-d', 'note-d#', 'note-e', 'note-f', 'note-f#', 'note-g', 'note-g#', 'note-a', 'note-a#', 'note-b'];
const notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
const display_notes = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

const select_root = document.getElementById('chord-root');
const select_type = document.getElementById('chord-type');

function find_index_for_major (root) {
    return [root, (root+4)%12, (root+7)%12];
}

function find_index_for_minor (root) {
    return [root, (root+3)%12, (root+7)%12];
}

function find_index_for_major7 (root) {
    return [root, (root+4)%12, (root+7)%12, (root+11)%12];
}

function find_index_for_minor7 (root) {
    return [root, (root+3)%12, (root+7)%12, (root+10)%12];
}

function find_index_for_dominant7 (root) {
    return [root, (root+4)%12, (root+7)%12, (root+10)%12];
}

function update_keyboard () {
    let root = select_root.value;
    let type = select_type.value;
    let root_idx = notes.indexOf(root);
    let notes_idx = [];

    // update the keyboard to show original color
    let white_keys = document.getElementsByClassName("white-key");
    Array.prototype.forEach.call(white_keys, (white_key) => {
        white_key.style.fill = 'white';
    });
    let black_keys = document.getElementsByClassName("black-key");
    Array.prototype.forEach.call(black_keys, (black_key) => {
        black_key.style.fill = 'black';
    });

    // calculate the notes
    if (type === 'major') {
        notes_idx = find_index_for_major(root_idx);
    } else if (type === 'minor') {
        notes_idx = find_index_for_minor(root_idx);
    } else if (type === 'major7') {
        notes_idx = find_index_for_major7(root_idx);
    } else if (type === 'minor7') {
        notes_idx = find_index_for_minor7(root_idx);
    } else if (type === 'dominant7') {
        notes_idx = find_index_for_dominant7(root_idx);
    }

    let chord_string = '';
    // update
    notes_idx.forEach((idx) => {
        chord_string = chord_string + ' ' + display_notes[idx];
        let hl_notes = document.getElementsByClassName(keyboard_notes[idx]);
        Array.prototype.forEach.call(hl_notes, (hl_note) => {
            hl_note.style.fill = '#CC3300';
        });
    });

    document.getElementById('chord-text').innerHTML = chord_string;

}

select_root.addEventListener("change", update_keyboard);
select_type.addEventListener("change", update_keyboard);
update_keyboard();
